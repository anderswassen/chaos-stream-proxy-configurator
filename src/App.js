import React, { useState } from 'react';

function App() {
  const [chaosProxyUrl, setChaosProxyUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [delay, setDelay] = useState('');
  const [segmentInput, setSegmentInput] = useState('');
  const [outputUrl, setOutputUrl] = useState('');

  const addHttpsIfMissing = (url) => {
    return url.startsWith('https://') ? url : `https://${url}`;
  };

  const handleChaosProxyUrlChange = (e) => {
    setChaosProxyUrl(e.target.value);
  };

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleDelayChange = (e) => {
    setDelay(e.target.value);
  };

  const handleSegmentInputChange = (e) => {
    setSegmentInput(e.target.value);
  };

  const generateUrl = () => {
    // Ensure https:// is added to both chaosProxyUrl and inputUrl if not present
    const finalChaosProxyUrl = addHttpsIfMissing(chaosProxyUrl);
    const finalInputUrl = addHttpsIfMissing(inputUrl);

    let segmentArray = [];
    if (segmentInput.trim() === '*') {
      segmentArray = [{ i: '*', ms: delay }];
    } else {
      const segments = segmentInput.split(',').map(segment => segment.trim());
      segmentArray = segments.map(segment => ({
        i: parseInt(segment, 10),
        ms: delay
      }));
    }

    const delayString = segmentArray
      .map(segment => (segment.i === '*' ? `{i:*,ms:${segment.ms}}` : `{i:${segment.i},ms:${segment.ms}}`))
      .join(',');

    const finalUrl = `${finalChaosProxyUrl}/api/v2/manifests/hls/proxy-master.m3u8?url=${finalInputUrl}&delay=[${delayString}]`;
    setOutputUrl(finalUrl);
  };

  return (
    <div>
      <h1>Chaos Stream Proxy Configurator</h1>
      <div>
        <label>Chaos Proxy URL: </label>
        <input
          type="text"
          value={chaosProxyUrl}
          onChange={handleChaosProxyUrlChange}
          placeholder="Enter chaos proxy URL"
        />
      </div>
      <div>
        <label>HLS Stream URL: </label>
        <input
          type="text"
          value={inputUrl}
          onChange={handleUrlChange}
          placeholder="Enter stream URL"
        />
      </div>
      <div>
        <label>Delay (ms): </label>
        <input
          type="number"
          value={delay}
          onChange={handleDelayChange}
          placeholder="Enter delay in ms"
        />
      </div>
      <div>
        <label>Segments: </label>
        <input
          type="text"
          value={segmentInput}
          onChange={handleSegmentInputChange}
          placeholder="Enter segment indices (e.g., 0,1 or *)"
        />
      </div>
      <button onClick={generateUrl}>Generate URL</button>

      {outputUrl && (
        <div>
          <h3>Generated URL:</h3>
          <p>{outputUrl}</p>
        </div>
      )}
    </div>
  );
}

export default App;
