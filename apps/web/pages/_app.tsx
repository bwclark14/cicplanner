import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createClient } from '@supabase/supabase-js';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  // Basic supabase client for use in components via direct import
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Curriculum Planner Scotland - hexagonal planning for teachers" />
      </Head>
      <div className="min-h-screen">
        <Nav />
        <main className="p-4">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;