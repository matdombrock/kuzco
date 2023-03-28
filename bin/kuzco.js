const { exec } = require('child_process');
const fs = require('fs');

const modelName = process.env.MODEL;

function _echo(msg){
  console.log(msg);
}

function _execHandler(cmd, callback = _echo, log=false){
  cmd = cmd+' > out'; 
  if(log){
    console.log('cmd: '+cmd);
  }
  exec(cmd, (error, stdout, stderr) => { 
    if (error) {
      if(log){
	console.error(`error: ${error.message}`);
      }
      return;
    }  
    if (stderr) {
      if(log) {
	console.error(`stderr: ${stderr}`);
      }
      // We always have std err
      //return;
    }
    if(log) {
      console.log(`stdout:\n${stdout}`);
    }
    const out = fs.readFileSync(__dirname+'/out', 'UTF-8');
    if(!out){
      console.log('error: Cant read output file!');
    }    
    callback(out);
  });
}

function single(prompt='Who was Kuzco?'){
  const cmd = `./kuzcore -m models/${modelName} -p "${prompt}"`;
  const res = _execHandler(cmd, _echo);
}

single(process.argv[2] || undefined);
