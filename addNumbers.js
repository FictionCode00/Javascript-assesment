function addNumbers(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Both input must be numbers.");
    }
    return a + b;
}
try{
 let sum=addNumbers(5,"7")
 console.log(sum);
}
catch(error){
    console.log(error);  
}
