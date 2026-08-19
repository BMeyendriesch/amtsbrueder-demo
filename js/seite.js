(function(){
  var tgl=document.querySelector('.navtoggle'),menu=document.getElementById('menu');
  if(tgl&&menu){
    tgl.addEventListener('click',function(){
      var o=menu.classList.toggle('open');tgl.setAttribute('aria-expanded',o);tgl.textContent=o?'×':'☰';
    });
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){
      menu.classList.remove('open');tgl.setAttribute('aria-expanded',false);tgl.textContent='☰';});});
  }

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }else{
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
  }

  var lb=document.getElementById('lightbox');
  if(lb){
    var lbimg=lb.querySelector('img'),lbcap=lb.querySelector('figcaption'),lbclose=lb.querySelector('button');
    document.querySelectorAll('.gallery .tack').forEach(function(fig){
      var img=fig.querySelector('img');
      fig.setAttribute('tabindex','0');fig.setAttribute('role','button');
      function open(){lbimg.src=img.dataset.gross||img.src;lbimg.alt=img.alt;
        lbcap.textContent=(fig.querySelector('figcaption')||{}).textContent||'';lb.classList.add('open');lbclose.focus();}
      fig.addEventListener('click',open);
      fig.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    });
    function close(){lb.classList.remove('open');lbimg.src='';}
    lbclose.addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
})();
