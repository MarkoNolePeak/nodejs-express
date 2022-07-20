const test = (req,res,next)=>{
    console.log(123);
    res.append('Warning', '202 Warning');

    next();

}

module.exports = {
    test1 : (req,res)=>{
        res.send(123);
        next();

    },
    test
}