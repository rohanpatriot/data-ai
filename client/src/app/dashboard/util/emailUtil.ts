export const shareInvitationTemplate = (url: string) => `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation to PerplexiGrid</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #212529;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    
    .email-header {
      background-color: #fff;
      padding: 30px 40px;
      text-align: center;
    }
    
    .logo {
      height: 40px;
      width: auto;
    }
    
    .email-body {
      padding: 40px;
      text-align: center;
    }
    
    h2 {
      color: #A224F0;
      font-size: 24px;
      font-weight: 600;
      margin-top: 0;
      margin-bottom: 25px;
    }
    
    p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    
    .button {
      display: inline-block;
      background-color: #A224F0;
      color: #FFFFFF !important;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 6px;
      margin: 10px 0 20px;
      transition: background-color 0.3s ease;
    }
    
    .button:hover {
      background-color: #8200FF;
    }
    
    .highlight-box {
      background-color: #f2e7fe;
      border-radius: 6px;
      padding: 20px;
      margin: 30px 0;
    }
    
    .highlight-box p {
      margin: 0;
      color: #A224F0;
      font-weight: 600;
    }
    
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px 40px;
      text-align: center;
      font-size: 14px;
      color: #6C757D;
    }
    
    .social-links {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    .social-link {
      display: inline-block;
      margin: 0 8px;
      text-decoration: none;
      color: #000;
    }
    
    .social-icon {
      height: 24px;
      width: 24px;
    }
    
    .footer-links a {
      color: #6C757D;
      text-decoration: none;
      margin: 0 8px;
    }
    
    .footer-links a:hover {
      text-decoration: underline;
    }
    
    /* For dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #212529;
      }
      
      .email-container {
        background-color: #2d3238;
      }

      .email-header {
        background-color: #212529;
      }
      
      .email-body {
        color: #e9ecef;
      }
      
      p {
        color: #e9ecef;
      }
      
      .highlight-box {
        background-color: #3a2a4d;
      }
      
      .highlight-box p {
        color: #d0b0ff;
      }
      
      .email-footer {
        background-color: #212529;
        color: #adb5bd;
      }

      .social-link {
        color: #fff;
      }
      
      .footer-links a {
        color: #adb5bd;
      }
    }
    
    /* Responsive styles */
    @media only screen and (max-width: 480px) {
      .email-header, .email-body, .email-footer {
        padding-left: 20px;
        padding-right: 20px;
      }
      
      h2 {
        font-size: 22px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="https://i.postimg.cc/jSSyBSSY/svgviewer-png-output.png" alt="Logo" />
    </div>
    
    <div class="email-body">
      <h2>You've Been Invited!</h2>
      <p>You have been invited to join PerplexiGrid, where you can create interactive analytics dashboards with natural language.</p>
      <div class="highlight-box">
        <p>Site: ${url}</p>
      </div>
      <p>Click the button below to accept this invitation and set up your account.</p>
      <a href="${url}" class="button">Accept Invitation</a>
      <p style="font-size: 14px; color: #6C757D;">This invitation expires in 7 days. If you didn't expect this invitation, you can safely ignore it.</p>
    </div>
    
    <div class="email-footer">
      <div class="social-links">
        <a href="https://github.com/PetarRan/perplexigrid" class="social-link">X</a>
        <a href="https://github.com/PetarRan/perplexigrid" class="social-link">LinkedIn</a>
        <a href="https://github.com/PetarRan/perplexigrid" class="social-link">Github</a>
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a> • <a href="#">Contact Us</a>
      </div>
      <p>© 2025 PerplexiGrid. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
