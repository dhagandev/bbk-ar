import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/styles/hljs';

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

import checks from '../../modules/checks';
import sections from '../../modules/sections.js';

const isCode = t => t.slice(0,3) === '~~~';
const languages = {
  js: 'jsx',
  gq: 'graphql',
  sh: 'powershell',
}

const TextBlocks = ({ textArray }) =>
  <div className="text-blocks">
    {textArray.map((t, i) => {
              
      const trimmed = t.trim();
      const language = languages[trimmed.slice(3,5)] || 'javascript';
      const code = trimmed.slice(5, trimmed.length-3).trim();

      return isCode(trimmed) ? 
        <div className="code-block"><SyntaxHighlighter key={i} language={language} style={okaidia}>{code}</SyntaxHighlighter></div> :
        <div className="text-block"><ReactMarkdown key={i} source={t} /></div>
      }
    )}
  </div>

const Step = (props) => {

  const { step, text, after, children, firstStep = false } = props;

  const textArray = Array.isArray(text) ? text : [text];
  const afterArray = Array.isArray(after) ? after : [after];

  const buttonText = firstStep ? `Let's get started!` : `Move on to Step ${step + 1}`;

  return (
    <div className="step">
      <div className="step-text">
        <h2>{step > 0 && `${step}. `}{sections[step]}</h2>
        <TextBlocks textArray={textArray}/>
      </div>

      {children && <div className="step-contents">{children}</div>}

      {checks[`step${step}`](props) && (
        <div className="step-done">
          {after && (
            <div className="step-after">
              <TextBlocks textArray={afterArray}/>
            </div>
          )}

          <div className="step-next">
            <Link className="btn btn-primary" to={`/step/${step + 1}`}>{buttonText}</Link>
          </div>
        </div>
      )}
    </div>
)};

registerComponent('Step', Step);
