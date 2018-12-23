const express = require('express');
const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.json());

const data = [
	{
		id:1,
		name:"MoonMan",
		sex:"Male"
	},
	{
		id:2,
		name:"Lara",
		sex:"Female"
	},
	{
		id:3,
		name:"Chiken",
		sex:"Male"
	}
];

//	GET
app.get('/',function(req,res){
	res.send('Hello World!!!');
});
app.get('/users',function(req,res){
	res.json(data);
});
app.get('/users/:id', function(req,res){
	data.forEach((user)=>{
		if(user.id===parseInt(req.params.id)){
			res.json(user);
		}
	});
	res.send('User with this id doesn\'t exist');
});
//	POST
app.post('/users',function(req,res){
	const infoOfNewUser=req.body;
	if(infoOfNewUser.name && infoOfNewUser.sex){
		if(data.length===0){
			data.push({id:1,name:infoOfNewUser.name, sex:infoOfNewUser.sex});
		}else{
			const lastUser=data[data.length-1]
			data.push({id:lastUser.id + 1,name:infoOfNewUser.name, sex:infoOfNewUser.sex});
		}
		res.send('User added.');
	} else {
		res.send('Didn\'t find any data.');
	}
});
//	DELETE
app.delete('/users/:id', function(req,res){
	data.forEach((item,index)=>{
		if(item.id===parseInt(req.params.id)){
			data.splice(index,1);
			res.send('Deleted.');
		}
	});
	res.send('User with this id doesn\'t exist');
});
//	PUT
app.put('/users/:id', function(req,res){
	const UpdateUserInfo = req.body;
	if(UpdateUserInfo.name && UpdateUserInfo.sex){
		data.forEach((item)=>{
			if(item.id===parseInt(req.params.id)){
				item.name=UpdateUserInfo.name;
				item.sex=UpdateUserInfo.sex;
				res.json(item);
			}
		});
		res.send('User with this id doest not exist.');
	} else {
		res.send('Write right data.');
	}
});

app.listen(3000,function(){
	console.log('Runing...');
});
