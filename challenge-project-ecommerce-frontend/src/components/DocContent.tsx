import React from 'react';
import { docData } from '../data/docData';

interface Props {
  selectedRoute: string;
}

export function DocContent({ selectedRoute }: Props) {
  const doc = docData[selectedRoute];

  if (!doc) {
    return (
      <div className="doc-content">
        <h3>Route not found</h3>
      </div>
    );
  }

  return (
    <div className="doc-content">
      <h2>{doc.title}</h2>
      <div className="doc-section">
        <strong>Method:</strong> {doc.method}
      </div>
      <div className="doc-section">
        <strong>URL:</strong> {doc.url}
      </div>
      {doc.headers && (
        <div className="doc-section">
          <strong>Headers:</strong>
          <pre>{JSON.stringify(doc.headers, null, 2)}</pre>
        </div>
      )}
      {doc.body && (
        <div className="doc-section">
          <strong>Request Body (JSON):</strong>
          <pre>{JSON.stringify(doc.body, null, 2)}</pre>
        </div>
      )}
      {doc.response && (
        <div className="doc-section">
          <strong>Response (example):</strong>
          <pre>{JSON.stringify(doc.response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
