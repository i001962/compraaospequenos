const React = require('react')
const ipfsClient = require('ipfs-http-client')
const CID = require('cids')
const Hero = require('Components/Hero')
const PageWrapper = require('Layouts/PageWrapper')
const fetch = require('node-fetch')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      added_file_hash: null
    }

    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.connect = this.connect.bind(this)
    this.multiaddr = React.createRef()
  }

  captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    if (document.getElementById('keep-filename').checked) {
      this.saveToIpfsWithFilename(event.target.files)
    } else {
      this.saveToIpfs(event.target.files)
    }
  }
 
  // Example #1
  // Add file to IPFS and return a CID
  async saveToIpfs([file]) {
      
    try {
      const added = await this.state.ipfs.add(
        file, {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      console.log(added)
      // call seallake with ipfs hash TODO sha256 or send file into env
      let hashofIpfsCID = (require("crypto")
      .createHash("sha256")
      .update(added.path)
      .digest("hex"));
      console.log(hashofIpfsCID);
      
    const body = {
      "envelope": {
        "dataHash": hashofIpfsCID,
        "metadata": {
          "storage": {
            "url": 'https://ipfs.io/ipfs/' + added.path,
            "contenttype": "text/html"
          },
              "location": "File Uploaded",
              "type": "File",
              "offer": "IPFS",
              "name": "Chrystler Building"
            }
          }
        }
    
        const options1 = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
          }
        }
    
        // const apiUrl1 = `http://ec2-100-20-87-209.us-west-2.compute.amazonaws.com/API/v1/envelope/gatsby1/` + added.path
    
        // const response = await fetch(apiUrl1, body, options1);
    
        fetch('https://plato.seallake.net/API/v1/envelope/ipfs/' + added.path, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Accept': 'application/json'
            },
          })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch((error) => {
            console.error('Error:', error);
          });
    
      this.setState({
        added_file_hash: added.cid.toString()
      })

    } catch (err) {
      console.error(err)
    }
  }

  // Example #2
  // Add file to IPFS and wrap it in a directory to keep the original filename
  async saveToIpfsWithFilename([file]) {
    const fileDetails = {
      path: file.name,
      content: file
    }
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`)
    }

    try {
      const added = await this.state.ipfs.add(fileDetails, options)
      console.log(added.cid.string)
      // Don't hate me for repeating this I'm just a lazy prototyper
      // call seallake with ipfs hash TODO sha256 or send file into env
      
        let hashofIpfsCID = (require("crypto")
        .createHash("sha256")
        .update(added.cid.string)
        .digest("hex"));
        console.log(hashofIpfsCID);
      const body = {
        "envelope": {
          "dataHash": hashofIpfsCID,
          "metadata": {
            "storage": {
              "url": 'https://ipfs.io/ipfs/' + added.cid.string,
              "contenttype": "text/html"
            },
            "location": "File Uploaded",
            "type": "File",
            "offer": "IPFS",
            "name": "Chrystler Building"
          }
        }
      }
  
      const options1 = {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      }
  
      // const apiUrl1 = `http://ec2-100-20-87-209.us-west-2.compute.amazonaws.com/API/v1/envelope/gatsby1/` + added.path
  
      // const response = await fetch(apiUrl1, body, options1);
      fetch('https://plato.seallake.net/API/v1/envelope/ipfs/' + added.cid.string, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json'
          },
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch((error) => {
          console.error('Error:', error);
        });

      // cid is CID of the DAG node created by adding a link

      this.setState({
        added_file_hash: added.cid.toString()
      })

    } catch (err) {
      console.error(err)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async connect() {
    this.setState({
      ipfs: ipfsClient(this.multiaddr.current.value)
    })
  }

  render() {
    if (this.state.ipfs) {
      console.log('ipfs is active')
      return ( < div style = {
          {
            color: "red"
          }
        } >
        <
        span className = "content" > Menu < /span> <
        form id = 'capture-media'
        onSubmit = {
          this.handleSubmit
        } >
        <
        input type = 'file'
        name = 'input-file'
        id = 'input-file'
        onChange = {
          this.captureFile
        }
        /><br/ >
        <
        label htmlFor = 'keep-filename' >
        <
        input type = 'checkbox'
        id = 'keep-filename'
        name = 'keep-filename' / >
        keep filename < /label> </form >
        <div >
        <a id = "gateway-link" target = '_blank' href = {
          'https://ipfs.io/ipfs/' + this.state.added_file_hash
        } > {
          this.state.added_file_hash
        } < /a>  </div > 
        <div><h3>You will find blochchain proofs here.</h3> 
        <p>They will update automatically once validated but ETH and BTC.</p></div>
        <div ><a id = "gateway-link" target = '_blank'href = {`https://plato.seallake.net/API/v1/envelope/ipfs/${this.state.added_file_hash}`} > {
          this.state.added_file_hash
        } </a>  </div > 
        
        < /
        div >
      )
    }

    return ( <
      div style = {
        {
          textAlign: 'center'
        }
      } >
      <
      h1 > Enter the multiaddr
      for an IPFS node HTTP API < /h1> <
      form >
      <
      input id = "connect-input"
      type = "text"
      defaultValue = "https://ipfs.infura.io:5001/api/v0"
      ref = {
        this.multiaddr
      }
      /> <
      input id = "connect-submit"
      type = "button"
      value = "Connect"
      onClick = {
        this.connect
      }
      /> < /
      form > <
      /div>
    )
  }
}
module.exports = App
