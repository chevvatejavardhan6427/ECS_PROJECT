import { useState } from 'react';
import LoadingPulse from '../components/LoadingPulse';
import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import { useRealtimeFeed } from '../hooks/useRealtimeFeed';
import { approveCamp, getAdminSnapshot, removeUser } from '../services/platformService';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const { data, loading, refresh } = useRealtimeFeed(() => getAdminSnapshot(token), [token], 25000);

  if (loading || !data) {
    return <LoadingPulse label="Loading admin analytics and moderation queue" />;
  }

  const analyticsCards = [
    { label: 'Total donors', value: data.analytics.donors.toLocaleString(), detail: 'Verified donor accounts' },
    { label: 'Requests fulfilled', value: data.analytics.requestsFulfilled.toLocaleString(), detail: 'Matched emergency requests' },
    { label: 'Active camps', value: data.analytics.activeCamps.toLocaleString(), detail: 'Published camp listings' },
    { label: 'Flagged requests', value: data.analytics.flaggedRequests.toLocaleString(), detail: 'Awaiting moderation' },
  ];

  return (
    <section className="section container">
      <SectionHeader
        eyebrow="Admin control room"
        title="Moderate trust, verify camps, and track impact"
        description="Admin workflows center around credibility: removing fake accounts, approving camps, and reviewing suspicious emergency requests."
      />

      {message ? <p className={styles.message}>{message}</p> : null}

      <div className="gridAuto">
        {analyticsCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className={styles.layout}>
        <div className="stackLg">
          <article className={`${styles.panel} surface`}>
            <div className="sectionHeaderRow">
              <div>
                <span className="badge">User management</span>
                <h3>Accounts and trust signals</h3>
              </div>
              <button type="button" className="buttonGhost" onClick={() => setMessage('User moderation actions are wired for backend approval flows.')}>Moderation policy</button>
            </div>
            <div className="tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Blood group</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.bloodGroup}</td>
                      <td className={styles.tableActionCell}>
                        <span>{user.status}</span>
                        {user.status === 'Watchlist' ? (
                          <button
                            type="button"
                            className="buttonGhost"
                            onClick={async () => {
                              const response = await removeUser(token, user.id);
                              setMessage(response.message || `${user.name} removed.`);
                              refresh();
                            }}
                          >
                            Remove
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className={`${styles.panel} surface`}>
            <span className="badge">Flagged emergency requests</span>
            <div className="stackMd">
              {data.flaggedRequests.map((request) => (
                <div key={request.id} className={`${styles.flagged} card`}>
                  <strong>{request.requesterName}</strong>
                  <p>{request.reason}</p>
                  <div className={styles.row}>
                    <span className="pill statusWarning">Fraud score review</span>
                    <button type="button" className="buttonGhost" onClick={() => setMessage(`Flag review opened for ${request.requesterName}.`)}>Review request</button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className={`${styles.panel} surface`}>
          <span className="badge">Camp approvals</span>
          <div className="stackMd">
            {data.camps.map((camp) => (
              <div key={camp.id} className={`${styles.campRow} card`}>
                <div>
                  <strong>{camp.title}</strong>
                  <p>{camp.organizer} · {camp.location.label}</p>
                </div>
                <button
                  type="button"
                  className={camp.isVerified ? 'buttonAccent' : 'button'}
                  onClick={async () => {
                    if (camp.isVerified) {
                      setMessage(`${camp.title} is already approved.`);
                      return;
                    }

                    const response = await approveCamp(token, camp.id);
                    setMessage(response.message || `${camp.title} approved.`);
                    refresh();
                  }}
                >
                  {camp.isVerified ? 'Approved' : 'Approve camp'}
                </button>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AdminPage;
