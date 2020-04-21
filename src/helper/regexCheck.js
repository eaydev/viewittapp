//REGEX VALIDATOR
export default function checkIfValid(entry){
    let subRegex = /^[^_]\w{2,20}/;

    return new Promise((resolve, reject)=>{
      if(subRegex.test(entry)){
        resolve("Valid name.");
      } else {
        reject("Invalid Reddit name.");
      }
    })
}
