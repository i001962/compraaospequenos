const fetch = require('node-fetch');
const queryString = require('query-string');

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}, configOptions) => {
  const {
    createNode
  } = actions;
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins;
  // Plugin code goes here...
  // Helper function that processes a seallake Collection envs to match Gatsby's node structure
  const processseallakeenvs = seallakeEnvelops => {
    const nodeId = createNodeId(`seallake-env-${seallakeEnvelops.envelope.envelopeId}`);
    const nodeContent = JSON.stringify(seallakeEnvelops);
    const nodeData = Object.assign({}, seallakeEnvelops, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'sealLakeEnvs',
        content: nodeContent,
        contentDigest: createContentDigest(seallakeEnvelops)
      }
    });
    return nodeData;
  };

  const options1 = {
    method: 'GET',
    headers: {}
  };
  const sldirectory = configOptions.directory;
  console.log(sldirectory);
  const apiUrl1 = `https://plato.seallake.net/API/v1/directory/`+sldirectory;
  const response = await fetch(apiUrl1, options1);
  const data1 = await response.json();
  // For each env get envelopes properties and envs
  console.log(data1);
  
  data1.directory.content.envelopes.forEach(envelopeObj => {
      const env = envelopeObj;
      console.log(env);
      if (envelopeObj.envelope) {console.log(true)}; 
      const nodeDataEnv = processseallakeenvs(env);
      // Use Gatsby's createNode helper to create a node from the node data
      createNode(nodeDataEnv);
      console.log('you created an env node');
  });
}