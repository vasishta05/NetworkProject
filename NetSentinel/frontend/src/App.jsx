import React, { useState, useEffect } from 'react';
import { Activity, Globe, Shield, Wifi } from 'lucide-react';

function App() {
  const [systemStats, setSystemStats] = useState(null);
  const [myIp, setMyIp] = useState(null);
  const [portTarget, setPortTarget] = useState('');
  const [portNumber, setPortNumber] = useState('80');
  const [scanResult, setScanResult] = useState(null);
  const [loadingScan, setLoadingScan] = useState(false);

  // Fetch System Stats periodically
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setSystemStats(data);
      } catch (err) {
        console.error("Error fetching status:", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch My IP once
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('/api/my-ip');
        const data = await res.json();
        setMyIp(data);
      } catch (err) {
        console.error("Error fetching IP:", err);
      }
    };
    fetchIp();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoadingScan(true);
    setScanResult(null);
    try {
      const res = await fetch('/api/check-port', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: portTarget, port: portNumber }),
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      setScanResult({ error: 'Scan failed' });
    }
    setLoadingScan(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1><Shield className="icon" /> NetSentinel</h1>
        <p>Network Security & Status Monitor</p>
      </header>

      <div className="grid">
        {/* Card 1: System Status */}
        <div className="card">
          <h2><Activity className="icon" /> System Traffic</h2>
          {systemStats ? (
            <div className="stats">
              <div className="stat-item">
                <span className="label">Bytes Sent</span>
                <span className="value">{(systemStats.bytes_sent / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="stat-item">
                <span className="label">Bytes Received</span>
                <span className="value">{(systemStats.bytes_recv / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <div className="stat-item">
                <span className="label">Packets Sent</span>
                <span className="value">{systemStats.packets_sent}</span>
              </div>
            </div>
          ) : (
            <p>Loading stats...</p>
          )}
        </div>

        {/* Card 2: IP Intelligence */}
        <div className="card">
          <h2><Globe className="icon" /> My Connection</h2>
          {myIp ? (
            <div className="ip-info">
              <p><strong>Public IP:</strong> {myIp.ip}</p>
              <p><strong>ISP:</strong> {myIp.org}</p>
              <p><strong>Location:</strong> {myIp.city}, {myIp.region}, {myIp.country_name}</p>
            </div>
          ) : (
            <p>Fetching IP info...</p>
          )}
        </div>

        {/* Card 3: Port Scanner */}
        <div className="card full-width">
          <h2><Wifi className="icon" /> Port Scanner</h2>
          <form onSubmit={handleScan} className="scan-form">
            <input
              type="text"
              placeholder="Target URL (e.g., google.com)"
              value={portTarget}
              onChange={(e) => setPortTarget(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Port (e.g., 80)"
              value={portNumber}
              onChange={(e) => setPortNumber(e.target.value)}
              required
            />
            <button type="submit" disabled={loadingScan}>
              {loadingScan ? 'Scanning...' : 'Check Port'}
            </button>
          </form>

          {scanResult && (
            <div className={`scan-result ${scanResult.status === 'OPEN' ? 'success' : 'error'}`}>
              {scanResult.error ? (
                <p>Error: {scanResult.error}</p>
              ) : (
                <p>Port {scanResult.port} on {scanResult.target} is <strong>{scanResult.status}</strong></p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
