// Error.jsx
import React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const styles = {
  container: {
    minHeight: "70vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    background: "#f9f9fb",
    color: "#1f2d3a",
    textAlign: "center",
  },
  code: {
    fontSize: "4rem",
    margin: 0,
    fontWeight: 700,
  },
  title: {
    margin: "0.5rem 0 0.25rem",
    fontSize: "1.75rem",
  },
  message: {
    fontSize: "1rem",
    margin: "0.75rem 0 1rem",
    maxWidth: 600,
  },
  button: {
    marginTop: "1rem",
    background: "#ff6b35",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    textDecoration: "none",
    fontWeight: 600,
    display: "inline-block",
  },
  details: {
    marginTop: "1rem",
    fontSize: "0.75rem",
    color: "#555",
    wordBreak: "break-all",
  },
};

const Error = () => {
  const error = useRouteError();
  console.log(error);

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let statusCode = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    title = error.statusText || title;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div style={styles.container} role="alert" aria-label="Error page">
      <div style={styles.code}>{statusCode || "😕"}</div>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.message}>{message}</p>
      <Link to="/" style={styles.button} aria-label="Go to homepage">
        Go Home
      </Link>
      <div style={styles.details}>
        {error && (
          <>
            <div>
              <strong>Debug info:</strong> {isRouteErrorResponse(error) ? `Status ${error.status}` : error.toString()}
            </div>
          </>
        )}
        <div>
          If the problem persists, contact support at <a href="mailto:support@foodfortress.com">support@foodfortress.com</a>.
        </div>
      </div>
    </div>
  );
};

export default Error;
