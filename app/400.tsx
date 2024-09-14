import React from 'react';

const Custom400: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>400</h1>
      <div style={styles.messageContainer}>
        <h2 style={styles.message}>Bad Request.</h2>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    background: '#fff',
    margin: 0,
  },
  errorCode: {
    display: 'inline-block',
    margin: '0 20px 0 0',
    paddingRight: '23px',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top',
    lineHeight: '49px',
    borderRight: '1px solid rgba(0, 0, 0, .3)',
  },
  messageContainer: {
    display: 'inline-block',
    textAlign: 'left',
  },
  message: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '49px',
    margin: 0,
  },
};

export default Custom400;
