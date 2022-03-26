import jwt from 'jsonwebtoken'
export const authentify = (role?: string) => async(req : any ,res: any ,next:any ) =>{
    try{
        const requestHeader = req.headers.authorization 
        if(!requestHeader) return res.status(401).send('Unauthorized')
        const token = requestHeader.split(' ')[1];
        const user = await jwt.verify(token,process.env.SECRET || 'SECRET',(err : any, user:any ) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            if(role && req.user.role !== role) return res.status(403).send('Unauthorized')
            next();
        });
    }catch(e){
        res.status(400).send('somthing went wrong')
    }
}