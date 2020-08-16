import React, { useState, useEffect } from 'react';
const ipfsClient = require('ipfs-http-client')


function Example1() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [multiaddr] = React.createRef();
  const added_file_hash = "https://ipfs.infura.io:5001/api/v0";
  const [ipfs, setIpfs] = useState(ipfsClient(added_file_hash));
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  // const added_file_hash = "https://ipfs.infura.io:5001/api/v0";
  return ( 
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setIsOnline(ipfs)}>Connect to IPFS</button>
      <div >
        <form id = 'capture-media' onSubmit = {() => setIpfs(ipfs)} >
          <input type = 'file'name = 'input-file' id = 'input-file' onChange = {() => setIpfs(ipfs)}/><br/ >
          {/* <label htmlFor = 'keep-filename' > 
            <input type = 'checkbox' id = 'keep-filename' name = 'keep-filename' />
            keep filename 
          </label>  */}
        </form >  
      <div>
        <a id="gateway-link" target='_blank' href={'https://ipfs.io/ipfs/' + added_file_hash}>{added_file_hash}</a> 
      </div > 
    </div>
  </div> 
  );
}

export default Example1