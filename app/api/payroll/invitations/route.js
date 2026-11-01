import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';
import {createClient} from '@supabase/supabase-js';
export const runtime='nodejs';
export async function POST(request){
 const cfg=['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','HISABPAY_SMTP_USER','HISABPAY_SMTP_PASSWORD','HISABPAY_APP_URL'];
 const publishable=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!publishable||!process.env.HISABPAY_SMTP_USER||!process.env.HISABPAY_SMTP_PASSWORD||!process.env.HISABPAY_APP_URL)return NextResponse.json({error:'Invitation email provider not configured'},{status:503});
 const auth=request.headers.get('authorization')||'';
 if(!auth.startsWith('Bearer '))return NextResponse.json({error:'Authentication required'},{status:401});
 const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,publishable,{global:{headers:{Authorization:auth}},auth:{persistSession:false,autoRefreshToken:false}});
 const {data:{user},error:authError}=await db.auth.getUser(auth.slice(7));
 if(authError||!user)return NextResponse.json({error:'Authentication required'},{status:401});
 let body;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 const {businessId,email,role}=body||{};
 if(typeof businessId!=='string'||!/^[0-9a-f-]{36}$/i.test(businessId)||typeof email!=='string'||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||!['preparer','reviewer','approver'].includes(role))return NextResponse.json({error:'Invalid invitation details'},{status:400});
 const {data:token,error}=await db.rpc('hisabpay_create_payroll_invite',{p_business_id:businessId,p_email:email.trim().toLowerCase(),p_role:role});
 if(error)return NextResponse.json({error:error.message},{status:403});
 const link=new URL('/payroll/invite',process.env.HISABPAY_APP_URL);link.searchParams.set('token',token);
 const transport=nodemailer.createTransport({host:'smtp.hostinger.com',port:465,secure:true,auth:{user:process.env.HISABPAY_SMTP_USER,pass:process.env.HISABPAY_SMTP_PASSWORD}});
 try{await transport.sendMail({from:process.env.HISABPAY_SMTP_USER,to:email.trim().toLowerCase(),subject:'Your HisabPay payroll invitation',text:'You have been invited as a '+role+' to a HisabPay payroll team. This single-use link expires in 7 days: '+link.toString()+'\nIf unexpected, ignore this message.'});return NextResponse.json({sent:true})}
 catch{await db.rpc('hisabpay_revoke_invite_by_token',{p_token:token});return NextResponse.json({error:'Mail delivery failed; invitation revoked. Check SMTP configuration.'},{status:502})}
}
