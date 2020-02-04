//storage Ctrll;
const StorCtrl = (function () {
    
    return{

        storeItem: function (item) {
            let items;
            if (localStorage.getItem('items') === null) {
                items = [];
                items.push(item)
                localStorage.setItem('items',JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem('items'))
                items.push(item)
                localStorage.setItem('items',JSON.stringify(items))
            }
        },
        getItemFromStorage: function () {
            let items;
            if (localStorage.getItem('items') === null) {
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
                
            }
            return items
        },
        updateItemFromStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item,index) => {
                if (item.id ===updatedItem.id ) {
                    items.splice(index,1,updatedItem)
                }
            });
            localStorage.setItem('items',JSON.stringify(items))
        },
        deleteItemFromStorage: function (id) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item,index) => {
                if (item.id ===id ) {
                    items.splice(index,1)
                }
            });
            localStorage.setItem('items',JSON.stringify(items))
        },
        clearItemsFromStorage: function () {
           localStorage.removeItem('items')
        }
        
    }
})()

//Item Controller;
const ItemCtrl = (function () {
    const Item = function (id,name,level,time) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.time = time;
    }
    //data structure;
    const data = {
          items: StorCtrl.getItemFromStorage(),
        // items:[],
         currentItem: null,
         totalItems: 0
    }
    
    return{
        logData: function () {
            return data
        },
        getItems: function () {
            return data.items
        },
        addItem: function (name,level) {
            //create Id;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            //create time;
            let mydate = new Date()
            let year = mydate.getFullYear()
            let month = mydate.getMonth();
            let date = mydate.getDate()
            let h = mydate.getHours()
            let m  = mydate.getMinutes()
            let time;
            let note;
            if (month < 10) {
                month +=  1
            month = `0${month}`
            } else {
        month = month
        }
        if (h < 10) {
            h = `0${h}`
        }
        if (h > 12) {
            h -= 12
            note = 'PM'
        }else{
            note = 'AM'
        }
        if (h === 24) {
            h =12
        }
        if (m < 10) {
            m = `0${m}`
        }
        if (date < 10) {
            date = `0${date}`
        }


        
        time = `<small>Date: ${date}/${month}/${year}<br>Time: ${h}:${m} ${note}</small>`
            
        const newItem = new Item(ID,name,level,time);
        data.items.push(newItem)
        return newItem
        },
        getItemById:function (Id) {
            let found = null;
            data.items.forEach(item => {
                if (item.id === Id) {
                    found = item
                    data.currentItem = found
                }
            });
            return found
        },
        getCurrentItem: function () {
            return data.currentItem
        },
        getTotaltudents: function () {
            let total = 0
            total = data.items.length
            data.totalItems = total;
            return total
        },
        updateItem: function (name,level) {

           //create E. time;
           let mydate = new Date()
           let year = mydate.getFullYear()
           let month = mydate.getMonth();
           let date = mydate.getDate()
           let h = mydate.getHours()
           let m  = mydate.getMinutes()
           let time;
           let note;
           if (month < 10) {
               month +=  1
           month = `0${month}`
           } else {
       month = month
       }
       if (h < 10) {
           h = `0${h}`
       }
       if (h > 12) {
           h -= 12
           note = 'PM'
       }else{
           note = 'AM'
       }
       if (h === 24) {
           h =12
       }
       if (m < 10) {
           m = `0${m}`
       }
       if (date < 10) {
           date = `0${date}`
       }

       time = `<small>Date: ${date}/${month}/${year}<br>E. Time: ${h}:${m} ${note}</small>`

       let found = null;

       data.items.forEach(item => {
           if (item.id === data.currentItem.id) {
               item.name = name;
               item.level = level;
               item.time = time;
               found = item
           }

       });
            return found        
        },
        deleteItem: function (Id) {
            //grt ids;
            const ids = data.items.map(function (item) {
                return item.id
            })
            //get index;
            const index = ids.indexOf(Id);
            //remove items;
            data.items.splice(index,1)
        },
        cleardataItem: function () {
            data.items = []
        }

    }
})()


//UI Cpntroller;
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        deleteBtn: '.delete-btn',
        updateBtn: '.update-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        inputName:'#input-name',
        inputLevel:'#select-level',
        editItem: '.edit-item',
        listItems: ' .item-cla',
        totalStudent: '.total-student',
        table:'.table'
    }
    return{
        populateItemList: function (items) {
            let html = '';
            items.forEach(item => {
                html += `
                <tr id="item-${item.id}">
                    <td>${item.name}</td>
                    <td>${item.level}</td>
            <td><small><span class="time">${item.time}<span><a href="#" ><i class="edit-item fa fa-pencil " aria-hidden="true"></i></a></small></td> 
                </tr>
                `
            });
            document.querySelector(UISelectors.itemList).innerHTML = html
        },
        getSelectors: function () {
            return UISelectors
        },
        getInputItem: function () {
            return{
                name:document.querySelector(UISelectors.inputName).value,
                level:document.querySelector(UISelectors.inputLevel).value
            }
        },
        clearInput: function () {
            document.querySelector(UISelectors.inputName).value = ''
            document.querySelector(UISelectors.inputLevel).value = ''
        },
        addItemList: function (item) {
            //create tr
            document.querySelector(UISelectors.table).style.display = 'table'

             // createtr
             const tr = document.createElement('tr');
             tr.className = 'item-cla'
             tr.id = `item-${item.id}`

             tr.innerHTML = `
                  <td>${item.name}</td>
                  <td>${item.level}</td>
                  <td class="mad"><span class="time">${item.time}<span><small><a href="#" ><i class="edit-item fa fa-pencil " aria-hidden="true"></i></a></small></td> 
                  `
             document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',tr)
        },
        hideTable: function () {
            document.querySelector(UISelectors.table).style.display = 'none'
        },
        clearEditState: function () {
            UICtrl.clearInput()
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'

        },
        showEditState: function () {
            document.querySelector(UISelectors.addBtn).style.display = 'none'
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'

        },
        addItemToForm: function () {
            document.querySelector(UISelectors.inputName).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.inputLevel).value = ItemCtrl.getCurrentItem().level
            
        },
        showTotalStudent: function (total) {
            document.querySelector(UISelectors.totalStudent).innerHTML = `<h4>Total Student Present: ${total}</h4>`
        },
        updateListItem:function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
              listItems= Array.from(listItems);
              listItems.forEach(listItem => {
                 const listID = listItem.getAttribute('id')
                 if (listID === `item-${item.id}`) {
                    document.querySelector(`#${listID}`).innerHTML = `
                      <td>${item.name}</td>
                      <td>${item.level}</td>
                      <td><span class="time">${item.time}<span><small><a href="#" ><i class="edit-item fa fa-pencil " aria-hidden="true"></i></a></small></td>
                      `
                   }
             });
            
            
        },
        deleteItemFromList: function (id) {
            const itemId = `#item-${id}`;
            const item= document.querySelector(itemId);
            item.remove()
        },
        removeListItem: function () {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems)
            listItems.forEach(listItem => {
                listItem.remove()
            });
            UICtrl.hideTable()

            
            
        }
    }
})()


//App COntroller
const App = (function (ItemCtrl,StorCtrl,UICtrl) {
    const UISelectors = UICtrl.getSelectors()
    const loadEventListeners = function () {
        document.querySelector(UISelectors.addBtn).addEventListener('click',addItemSubmit)
        document.addEventListener('keypress',function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault()
            }
            return false
        })
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick)
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit)
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState())
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit)
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearListItemClick)

    }
    
    const addItemSubmit = function (e) {
    const input = UICtrl.getInputItem()
        if (input.name !== '' && input.level !== 'None') {
            const newItem =  ItemCtrl.addItem(input.name,input.level)
            UICtrl.addItemList(newItem);
            //UICtrl.clearInput()
            //totalItem;
            const totalIt = ItemCtrl.getTotaltudents()
            //showTotalStudent
            UICtrl.showTotalStudent(totalIt)
            //add Iten to LocalStorage;
            StorCtrl.storeItem(newItem)
        }
        
        e.preventDefault()
    }
    
    // itemEditClick
    const itemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            const listId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id
            const listIdArr = listId.split('-')
            const ID = parseInt(listIdArr[1])
           const currentItem =  ItemCtrl.getItemById(ID)
           //show Item in Form;
           UICtrl.addItemToForm()
           UICtrl.showEditState()
        }

        e.preventDefault()
    }

    //itemUpdateSubmit
    const itemUpdateSubmit = function (e) {
        const input = UICtrl.getInputItem()
        if (input.name !== '' && input.level !== 'None') {
            const updatedItem =ItemCtrl.updateItem(input.name,input.level)
            //updateItem in UI;
            UICtrl.updateListItem(updatedItem)
           
            //updateItemFromStorage
             StorCtrl.updateItemFromStorage(updatedItem)
             UICtrl.clearEditState()
           
            

        }

        e.preventDefault()
    }
    

    //itemDeleteSubmit
    const itemDeleteSubmit = function (e) {
        const currentItem = ItemCtrl.getCurrentItem()
        ItemCtrl.deleteItem(currentItem.id)
        UICtrl.deleteItemFromList(currentItem.id)
        StorCtrl.deleteItemFromStorage(currentItem.id)
        UICtrl.clearEditState()
        e.preventDefault()
    }

    //clearListItemClick
    const clearListItemClick = function (e) {
        // clear data Item;
        ItemCtrl.cleardataItem()
        UICtrl.removeListItem()
        //totalItem;
        const totalIt = ItemCtrl.getTotaltudents()
        //showTotalStudent
        UICtrl.showTotalStudent(totalIt)
        StorCtrl.clearItemsFromStorage()
        UICtrl.clearInput()

        e.preventDefault()
    }





    return{

        init: function () {
           
            const items = ItemCtrl.getItems()
            //
            UICtrl.clearEditState()
             //totalItem;
             const totalIt = ItemCtrl.getTotaltudents()
             //showTotalStudent
             UICtrl.showTotalStudent(totalIt)
            if (items.length === 0) {
                //hide list;
                UICtrl.hideTable()
            } else {               
                //Pppulate UI;
            UICtrl.populateItemList(items)

            }
            
           

            loadEventListeners()
        }
        
    }
})(ItemCtrl,StorCtrl,UICtrl)

App.init()



