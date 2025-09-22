let posts = [
  {
    id:1,
    author:"Khoudr",
    avatar:"./avatars/avatar1.jpg",
    channel:"Monthly Challenge",
    time:"2d",
    text:"Welcome to hamoods cafe — this project was mainly done with Copilot. I explained the idea and refined it."
  },
  {
    id:2,
    author:"yehya",
    avatar:"./avatars/avatar2.png",
    channel:"Question of the Week",
    time:"1d",
    text:"Question of the Week #79: To celebrate our GitHub Copilot course launch — Have you tried vibe coding?"
  },
  {
    id:3,
    author:"Rawan",
    avatar:"./avatars/avatar3.png",
    channel:"Monthly Challenge",
    time:"1d",
    text:"tic-tac-toe (cute version) — designed in Figma then used HTML/CSS/JS."
  }
];

const events = [
  {title:"GitHub Copilot: AMA on IG LIVE", date:"Sep 17"},
  {title:"Docker Basics: Community Workshop", date:"Sep 23"},
];

const STORAGE_KEY = 'codedex_posts_v1';
const postsContainer = document.getElementById('posts');
const eventsList = document.getElementById('eventsList');
const postTemplate = document.getElementById('postTemplate');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const loadMoreBtn = document.getElementById('loadMore');
const loadMoreWrap = document.getElementById('loadMoreWrap');
const newPostBtn = document.getElementById('newPostBtn');
const newPostModal = document.getElementById('newPostModal');
const newPostForm = document.getElementById('newPostForm');
const npAuthor = document.getElementById('npAuthor');
const npText = document.getElementById('npText');
const npChannel = document.getElementById('npChannel');
const npAvatar = document.getElementById('npAvatar');
const npCancel = document.getElementById('npCancel');

let idCounter = posts.length ? Math.max(...posts.map(p=>p.id)) : 0;
let pageSize = 3;
let currentPage = 1;
let currentFilter = 'top';

function loadPosts(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return posts.slice();
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed) || parsed.length===0) return posts.slice();
    posts = parsed;
    idCounter = posts.length ? Math.max(...posts.map(p=>p.id)) : idCounter;
    return posts;
  }catch(e){
    return posts.slice();
  }
}

function savePosts(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); }catch(e){}
}

function renderPost(p){
  const tpl = postTemplate.content.cloneNode(true);
  tpl.querySelector('.avatar').src = p.avatar || 'https://i.pravatar.cc/46';
  tpl.querySelector('.author-name').textContent = p.author || 'Unknown';
  tpl.querySelector('.rank').textContent = '';
  tpl.querySelector('.channel-link').textContent = p.channel || 'General';
  tpl.querySelector('.timeago').textContent = p.time || '';
  tpl.querySelector('.post-text').textContent = p.text || '';
  tpl.querySelector('.like-count').textContent = Math.floor(Math.random()*40);
  tpl.querySelector('.comment-count').textContent = Math.floor(Math.random()*20);
  postsContainer.appendChild(tpl);
}

function renderPosts(){
  postsContainer.innerHTML = '';
  const ordered = currentFilter === 'top' ? posts.slice() : posts.slice().reverse();
  const total = ordered.length;
  const end = Math.min(currentPage * pageSize, total);
  const pageItems = ordered.slice(0, end);
  pageItems.forEach(renderPost);
  if(end < total){
    loadMoreWrap.style.display = 'block';
  } else {
    loadMoreWrap.style.display = 'none';
  }
}

function renderEvents(){
  eventsList.innerHTML = '';
  events.forEach(ev=>{
    const li = document.createElement('li');
    li.textContent = `${ev.date} — ${ev.title}`;
    eventsList.appendChild(li);
  });
}

function applyFilter(filter){
  currentFilter = filter;
  currentPage = 1;
  filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  renderPosts();
}

filterButtons.forEach(b=>{
  b.addEventListener('click', ()=> applyFilter(b.dataset.filter));
});

loadMoreBtn && loadMoreBtn.addEventListener('click', ()=>{
  currentPage += 1;
  renderPosts();
});

newPostBtn.addEventListener('click', openModal);

function openModal(){
  newPostModal.classList.remove('hidden');
  npAuthor.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  newPostModal.classList.add('hidden');
  newPostForm.reset();
  document.body.style.overflow = '';
}

npCancel.addEventListener('click', closeModal);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && !newPostModal.classList.contains('hidden')) closeModal();
});

newPostForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const author = npAuthor.value.trim() || 'Anonymous';
  const text = npText.value.trim() || '';
  const channel = npChannel.value.trim() || 'General';
  const avatar = npAvatar.value.trim() || `https://i.pravatar.cc/46?u=${encodeURIComponent(author)}`;
  if(!text) { alert('Please enter text for the post'); return; }
  idCounter += 1;
  const newPost = {
    id: idCounter,
    author,
    avatar,
    channel,
    time: 'now',
    text
  };
  posts.unshift(newPost);
  savePosts();
  currentPage = 1;
  applyFilter(currentFilter);
  closeModal();
});

loadPosts();
renderEvents();
applyFilter('top');
