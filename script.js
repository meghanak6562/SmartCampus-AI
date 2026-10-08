const demoAnswers = {
  "where is the library?": "The library is in the main academic block. In the final version, we will replace this demo information with your college's actual location.",
  "how do i report a campus problem?": "Go to 'Report Issue', describe the problem and location, and submit it. The AI can later classify the issue and assign a priority.",
  "what are the college timings?": "The demo college timings are 9:00 AM to 4:30 PM, Monday to Friday. Replace this with your college's actual timings.",
  "what notices are available?": "Current demo notices include internal assessment updates, student services information and upcoming campus events."
};

function addMessage(text, type){
  const chat=document.getElementById('chat');
  const div=document.createElement('div');
  div.className='message '+type;
  div.textContent=text;
  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
}

function ask(q){
  document.getElementById('question').value=q;
  sendMessage();
}

function sendMessage(){
  const input=document.getElementById('question');
  const q=input.value.trim();
  if(!q) return;
  addMessage(q,'user');
  input.value='';
  setTimeout(()=>{
    const key=q.toLowerCase().replace(/[?!.,]/g,'').trim();
    let answer=demoAnswers[key];
    if(!answer) answer="I can help with campus information and campus issues. In the full hackathon version, I'll use your college's knowledge base to give a specific answer.";
    addMessage(answer,'ai');
  },500);
}

document.getElementById('reportForm').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('name').value;
  const location=document.getElementById('location').value;
  const issue=document.getElementById('issue').value;
  const result=document.getElementById('reportResult');
  result.textContent=`✓ Issue submitted by ${name}. Location: ${location}. AI classification will be added in the next version.`;
  this.reset();
});

function toggleMenu(){
  const nav=document.querySelector('nav');
  nav.style.display = nav.style.display==='flex' ? 'none' : 'flex';
  nav.style.position='absolute';
  nav.style.top='72px';
  nav.style.right='5%';
  nav.style.flexDirection='column';
  nav.style.background='#0b1020';
  nav.style.padding='18px';
  nav.style.border='1px solid #24314d';
  nav.style.borderRadius='12px';
}
