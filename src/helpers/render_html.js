const renderHTML = (componentHTML, initialState, assetUrl) => {
  return `
    <!DOCTYPE html>
      <html lang="ru-RU">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HVU</title>
          <link rel="icon" href="/favicon.png">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
          <link rel="stylesheet" href="${assetUrl}/assets/styles.css">
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
					<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)}
          </script>
        <script type="application/javascript" src="${assetUrl}/assets/bundle.js"></script>
      </body>
    </html>
  `;
};

export default renderHTML;
