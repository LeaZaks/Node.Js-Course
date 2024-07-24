const auth = (req, res, next)=>{
    console.log('Am i allowed?');
    next();
};

module.export = auth;