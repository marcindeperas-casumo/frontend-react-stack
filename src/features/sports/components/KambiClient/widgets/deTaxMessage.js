const deTaxMessage = `
    <html>
    <head>
        <link type="text/css" href="https://c3-static.kambi.com/client/widget-api/1.0.0.100/resources/css/ca/cade/widgets.css" />
        <style>
        html, body {
            margin: 0;
        }
        p {
            color: white;
            padding: 8px;
            font-family: Circular Pro,Arial,sans-serif;
            font-size: 12px;
            font-weight: 400;
            color: #c9d6d6;
            margin: 0;
            line-height: 1.5em;
            cursor: pointer;
        }
        </style>
    </head>
    <body>
        <p class="KambiWidget-branding" onClick="parent.postMessage({type: 'SHOW_TERMS'}, '${window.location.origin}')">
            Bitte beachten Sie, dass wir bei einer Auszahlung 5% Ihres potenziellen Gewinns einbehalten.
        </p>
    </body>
    </html>
`;

export const deTaxMessageUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
  deTaxMessage
)}`;
