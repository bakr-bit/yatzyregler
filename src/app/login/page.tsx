'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.push('/');
      router.refresh();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>🔒 Password Required</h1>
        <p>Please enter the password to access the site</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={styles.input}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
