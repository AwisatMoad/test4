
const handleRegister = (req,res,db,bcrypt)=>{
    
    console.log('register');
    console.log(req.body.password);
    console.log(req.body.email);

    const {email,name,password} = req.body;
    

    var hash = bcrypt.hashSync(password, 10);
    console.log('hash=  ',hash);

    db.transaction( (trx) => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then( loginEmail => {
            return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name:name,
                        joined: new Date()
                    })
                    .then( user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
        })
        .catch( err => {
            res.status(400).json('unable to register');
        })
    })
}

module.exports = {
    handleRegister:handleRegister
}