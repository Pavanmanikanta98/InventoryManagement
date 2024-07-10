const express = require('express');

const config = require('config');

const jwt = require('jsonwebtoken');

 const adminAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        //  console.log(` ${config.get('jwtSecret')}`)
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // console.log(decoded)
        if( decoded.role !== 'admin') return res.status(403).json({message:"access denied"}); 

        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


//general auhtentication

const generalAuth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        //  console.log(` ${config.get('jwtSecret')}`)
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // console.log(decoded)
        if( decoded.role !== 'admin' || decoded.role !== 'user') return res.status(403).json({message:"access denied"}); 

        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};



module.exports = {
     adminAuth,
     generalAuth
};












