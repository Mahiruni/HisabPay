'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {createClient} from '@supabase/supabase-js';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const db=url&&key?createClient(url,key):null;
export default function PayrollInvite(){
 const [session,setSession]=useState(null),[token,setToken]=useState(''),[busy,setBusy]=useState(false),[status,setStatus]=useState('');
 useEffect(()=>{setToken(new URLSearchParams(window.location.search).get('token')||'');if(!db)return;db.auth.getSession().then(({data})=>setSession(data.session));const {data:{subscription}}=db.auth.onAuthStateChange((_event,s)=>setSession(s));return()=>subscription.unsubscribe()},[]);
 async function accept(){if(!db||!session||!token)return;setBusy(true);const {error}=await db.rpc('hisabpay_accept_payroll_invite',{p_token:token});setBusy(false);setStatus(error?error.message:'Invitation accepted. Your payroll role is now active.')}
 return <main style={{maxWidth:520,margin:'6vh auto',padding:24,fontFamily:'system-ui'}}><h1>HisabPay payroll invitation</h1><p>Only the verified email address specified by the business owner may accept this invitation. Invitations expire after seven days.</p>{!db?<p>Supabase is not configured.</p>:!session?<p>Please sign in with your invited account first, then return to this link.</p>:!token?<p>Invitation token is missing.</p>:<button type="button" disabled={busy} onClick={accept}>{busy?'Verifying…':'Accept invitation'}</button>}{status&&<p role="status">{status}</p>}<p><Link href="/payroll">Return to payroll</Link></p></main>
}