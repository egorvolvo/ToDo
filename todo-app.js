(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement("h2");
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add("input-group", "mb-3");
        input.classList.add("form-control");
        input.placeholder = "введите название нового дела";
        buttonWrapper.classList.add("input-group-append");
        button.classList.add('btn', 'btn-primary');
        button.textContent = "Добавить дело";
        button.disabled = true;

        input.addEventListener('input', function(){
            button.disabled = input.value ? false : true;
        });


        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);


        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('url');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li')
        let buttonGroup = document.createElement('div')
        let doneButton = document.createElement("button");
        let deleteButton = document.createElement('button');

        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = "Готово";
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = "Удалить";

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }
    function createTodoApp(container, title = "cписок дел", arr, key) {
        let data = [];
        // if (JSON.parse(localStorage.getItem(key)).length > 0 ) {
        //     data = JSON.parse(localStorage.getItem(key));
        // } else {
        //     data = arr;
        // }

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        let todoitemjsonARR = JSON.stringify(data);
        localStorage.setItem(key, todoitemjsonARR);
        for (let i = 0; i < data.length; i++) {
            let todoItemMass = data[i].name;
            let todoList = createTodoList();
            let todoItem = createTodoItem(todoItemMass);
            container.append(todoList);
            todoList.append(todoItem.item);
            todoItem.doneButton.addEventListener('click', function(e){
            todoItem.item.classList.toggle('list-group-item-success');
            let dataEddite  = data.filter(elem => elem.name == todoItem.item.firstChild.textContent);
            dataEddite[0].done = true;
            data.push.dataEddite;
            console.log(dataEddite);
            todoitemjsonARR = JSON.stringify(data);
            localStorage.setItem(key, todoitemjsonARR);
            });
            todoItem.deleteButton.addEventListener("click", function(e) {
                if(confirm('Вы уверены?')){
                    console.log(data.name)
                    data = data.filter(elem => elem.name !== todoItem.item.firstChild.textContent)
                    console.log(e.target.data)
                    console.log(data)
                    todoitemjsonARR = JSON.stringify(data);
                    localStorage.setItem(key, todoitemjsonARR);
                    todoItem.item.remove();

                }
            })
        };
        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            let todoList = createTodoList();
            let todoItem = createTodoItem(todoItemForm.input.value);
            todoItem.doneButton.addEventListener('click', function(e){
                todoItem.item.classList.toggle('list-group-item-success');
                let dataEddite  = data.filter(elem => elem.name == todoItem.item.firstChild.textContent);
                dataEddite[0].done = true;
                data.push.dataEddite;
                console.log(dataEddite);
                todoitemjsonARR = JSON.stringify(data);
                localStorage.setItem(key, todoitemjsonARR);
            });


          todoItem.deleteButton.addEventListener("click", function() {

            if(confirm('Вы уверены?')){
              console.log(data.name)

                    data = data.filter(elem => elem.name !== todoItem.item.firstChild.textContent)
              console.log(e.target.data)
              todoitemjsonARR = JSON.stringify(data);
              localStorage.setItem(key, todoitemjsonARR);

              todoItem.item.remove();
              console.log(todoItem.item);


            }
          })

            container.append(todoList);
            todoList.append(todoItem.item);
            data.push({name: todoItemForm.input.value, done: false})
            let todoitemjsonARR = JSON.stringify(data);
            localStorage.setItem(key, todoitemjsonARR);
            console.log(data.name);
            console.log(data[1]);


            })
    }

    window.createTodoApp = createTodoApp;
})();

