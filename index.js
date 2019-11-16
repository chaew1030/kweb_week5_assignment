const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const diaryBook = [];
let message='';

const showDiary = function(diary){
	let message = '';
	message += ` #${diary.id}: ${diary.title} (${diary.isActive})`;
	return message;
};

const noDiary = function(index){
	let msg404 = `Diary #${index} does not exist!`;
	return msg404;
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => res.send('Welcome to my diary'));

app.get('/diaries', (req, res) => {
	if(diaryBook.length ==0) 
		res.send('No diary written!');
	else
	{
		message='';
		for(let diary of diaryBook)
		{
			message += showDiary(diary);
			if(diary.id < diaryBook.length-1) message +='\n';
		}
		res.send(message);
	}
});

app.get('/diary/:id', (req,res) => {
	const params_id = req.params.id;
	if(params_id <0 || params_id >= diaryBook.length)	
	{
		let msg404 = `Diary #${params_id} does not exist!`;
		res.status(404).send(msg404);
	}else
	{	
		const req_diary = diaryBook[params_id];
		if(!req_diary.isActive) 
			res.send(`Diary #${params_id} has already been deleted`);
		else 
			res.send('Diary'+showDiary(req_diary));
	}
});

app.get('/diary', (req,res) => {
	const query_id = req.query.id;
	res.redirect('/diary/' + query_id);
});

app.post('/diary', (req,res) => {
	const diary = {
		id: diaryBook.length,
		title: req.body.title,
		isActive: true
	};
	
	diaryBook.push(diary);
	res.send('Added Diary'+showDiary(diary));
});
	
app.put('/diary', (req,res) => {
	const put_id = req.body.id;
	
	if(put_id <0 || put_id >= diaryBook.length)	
	{
		let msg404 = `Diary does not exist!`;
		res.status(404).send(msg404);
	}else
	{	
		const put_diary = diaryBook[put_id];
		const put_diary_title = req.body.title;
		if(!put_diary.isActive) 
			res.send(`Diary #${put_id} has already been deleted`);
		else 
		{
			put_diary.title = put_diary_title;
			res.send('Changed Diary'+showDiary(put_diary));
		}
	}

});

app.delete('/diary', (req,res) => {
	const del_id = req.body.id;
	
	if(del_id <0 || del_id >= diaryBook.length)
	{
		let msg404 = `Diary does not exist!`;
		res.status(404).send(msg404);
	} 
	else
	{
		const del_diary = diaryBook[del_id];		
		if(!del_diary.isActive)
			res.send(`Diary #${del_id} has already already been deleted`);
		else
		{
			del_diary.title = '';
			del_diary.isActive = false;
			res.send(`Deleted diary #${del_id} (${del_diary.isActive})`);
		}
	}
});

app.listen(port, () => console.log(`Diary server is working...`));
