
    const ul = document.createElement('ul');

    const navItems = ['Home','link one','link two','link three'];
    
    document.querySelector('.navbar').appendChild(ul);
    navItems.forEach(renderNavItems);

    var text;
    function renderNavItems(element, index, arr) {
        var li = document.createElement('li');
        
        ul.appendChild(li);
        
        text = document.createTextNode(element);
        
        li.innerHTML=li.innerHTML + element;
    }

