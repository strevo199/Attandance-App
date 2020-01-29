//Stroage Controller
const StorageCtrl = (function () {
    

    return {
        storeItem:function (item) {
            let items;
            if (localStorage.getItem('items') === null) {
                items = []
                items.push(item);
                localStorage.setItem('items',JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem('items'))
                items.push(item);
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
            //Item consturture;
            const Item = function (id,name,level,time) {
                this.id = id;
                this.name = name;
                this.level = level;
                this.time = time
            }
            //data struture;
            const data = {
                items:StorageCtrl.getItemFromStorage(),
                 //items: [//{id:0,name:'sssssssssssss',level:'ss1',time:'20/Jan/2020'},
                //     {id:0,name:'lala',level:'ss3',time:'22/Jan/2020'},
                //     {id:0,name:'precious',level:'ss4',time:'23/Jan/2020'},
                // ],
                //items:[],
                currentItem:null,
                totalStudent:0
            }

            return{
                logData: function () {
                    return data
                },
                getItem: function () {
                    return data.items
                },
                addItem: function (name,level) {
                    //create ID;
                    if (data.items.length > 0) {
                        ID = data.items[data.items.length - 1].id + 1
                    } else {
                        ID = 0
                    }
                   //get time;
                   let note;
                   let time;
                   const mydate = new Date()
                   let year = mydate.getFullYear()
                   let month = mydate.getMonth()
                   let day = mydate.getDate()
                   //time;
                   const currentTime = new Date();
                   let h = currentTime.getHours();
                   let m = currentTime.getMinutes()
                   if (month < 10) {
                        month +=  1
                    month = `0${month}`
                    } else {
                month = month
                }
                if (h < 10) {
                 h = `${h}`
                }
                if (h < 12) {
                note = 'AM'
                } else {
                note = 'PM'
                h -= 12
                }
                if (h < 10) {
                h = `0${h}`
                    }
                if (m < 10) {
                 m = `0${m}`
                }
                time = `<small>Date: ${day}/${month}/${year}<br>Time: ${h}:${m} ${note}</small>`
                
                const newItem = new Item(ID,name,level,time)
                data.items.push(newItem);
                return newItem
            },
            totalStudentPresent: function () {
                let total;
                total = data.items.length

                data.totalStudent  = total
                return total
            },
            getItemById: function (ID) {
                let found = null;
                data.items.forEach(item => {
                    if (item.id === ID) {
                        found = item;
                        data.currentItem = found
                    }
                });
                return found
            },
            getCurrentItem:function () {
                return data.currentItem
            },
            updateItem: function (name,level) {
                //get time;
                let note;
                let time;
                const mydate = new Date()
                let year = mydate.getFullYear()
                let month = mydate.getMonth()
                let day = mydate.getDate()
                //time;
                const currentTime = new Date();
                let h = currentTime.getHours();
                let m = currentTime.getMinutes()
                if (month < 10) {
                     month +=  1
                 month = `0${month}`
                 } else {
             month = month
             }
             if (h < 10) {
              h = `${h}`
             }
             if (h < 12) {
             note = 'AM'
             } else {
             note = 'PM'
             h -= 12
             }
             if (h < 10) {
             h = `0${h}`
                 }
             if (m < 10) {
              m = `0${m}`
             }
             time = `<small>Date: ${day}/${month}/${year}<br>E. Time: ${h}:${m} ${note}</small>`
             
             //
             let found = null;
             data.items.forEach(item => {
                 if (item.id === data.currentItem.id) {
                     item.name = name;
                     item.level = level;
                     item.time = time
                     found = item;
                 }
             });
             return found
            },
            deleteItem: function (ID) {
                //get Ids;
                const ids = data.items.map(function (item) {
                    return item.id
                })
                //get index;
                const index = ids.indexOf(ID)
                //remove item;
                data.items.forEach((item,index) => {
                    if (item.id ===ID) {
                        data.items.splice(index,1)
                    }
                });
            },
            removeAllItem: function () { 
                data.items = []
            }
        }
  }
    )()


//UI Controller
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
            totalStudent: '.total-student'
        }
        return{
            populateListItems: function (items) {
                let html = '';
                items.forEach(item => {
                    
                    html +=`
                    <tr class="item-cla" id="item-${item.id}">
                          <td>${item.name}</td>
                          <td>${item.level}</td>
                <td class="mad"><span class="time">${item.time}<span><small><a href="#" ><i class="edit-item fa fa-pencil " aria-hidden="true"></i></a></small></td> 
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
            addItemtoList: function (item) {
                document.querySelector('table').style.display = 'block'
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
               window.location.reload()
            },
            setTotalStudents: function (total) {
                document.querySelector(UISelectors.totalStudent).textContent = `Total Student Present: ${total}`
            },
            hideList: function () {
                document.querySelector('table').style.display = 'none'
            },
            clearInput: function () {
                document.querySelector(UISelectors.inputName).value = ''
                document.querySelector(UISelectors.inputLevel).value = ''
               
             },
             clearEditState:function () {
                UICtrl.clearInput()
                document.querySelector(UISelectors.addBtn).style.display = 'inline'
                document.querySelector(UISelectors.deleteBtn).style.display = 'none'
                document.querySelector(UISelectors.backBtn).style.display = 'none'
                document.querySelector(UISelectors.updateBtn).style.display = 'none'
               },
           showEditState:function () {
                   document.querySelector(UISelectors.addBtn).style.display = 'none'
                   document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
                   document.querySelector(UISelectors.backBtn).style.display = 'inline'
                   document.querySelector(UISelectors.updateBtn).style.display = 'inline'
           },
           addItemToForm: function () {
            document.querySelector(UISelectors.inputName).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.inputLevel).value =ItemCtrl.getCurrentItem().level
            UICtrl.showEditState()
           
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
         deleteItemFormList: function (id) {
             const itemID = `#item-${id}`
             const item = document.querySelector(itemID);
             item.remove()
         },
         clearListItem: function () {
             let listItems = document.querySelectorAll(UISelectors.listItems);
             listItems = Array.from(listItems)
             listItems.forEach(listItem => {
                 listItem.remove()
             });
             UICtrl.hideList()

         }
            
        }
    }
)()

//App  Controller
const App = (function (ItemCtrl,StorageCtrl,UICtrl) {
    const UISelectors = UICtrl.getSelectors()
    //loadEventListeners
    const loadEventListeners = function () {
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit)
        document.addEventListener('keypress',function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault()
            }
            return false
        })
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick)
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit)
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState)
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit)
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick)
    }
        //itemAddSubmit
        const itemAddSubmit = function (e) {
            //getInput;
             const input = UICtrl.getInputItem()
            if (input.name !== '' && input.level !== '' && input.level !== 'None' && input.name.length <=15) {
               const newItem =  ItemCtrl.addItem(input.name,input.level)
                //addItemtoList
                UICtrl.addItemtoList(newItem)
                //TotalStudent;
            const totalStudents=ItemCtrl.totalStudentPresent()
                UICtrl.setTotalStudents(totalStudents)
                //storageItem
                StorageCtrl.storeItem(newItem)
                //clearInput;
                //UICtrl.clearInput()
                
            }
            e.preventDefault()
        }
        //itemEditClick
        const itemEditClick = function (e) {
            if (e.target.classList.contains('edit-item')) {
                const listId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id
                const listIdArr = listId.split('-')
                const ID = parseInt(listIdArr[1])
                const currentItem =  ItemCtrl.getItemById(ID);
                //addItemToForm
                UICtrl.addItemToForm();
                
            }
            e.preventDefault()
        }

        //itemUpdateSubmit
        const itemUpdateSubmit = function () {
            //getINput;
            const input = UICtrl.getInputItem();
            if (input.name !== ''&& input.level !== '' && input.level !== 'None' && input.name.length <=15) {
                const updatedItem = ItemCtrl.updateItem(input.name,input.level)
                UICtrl.updateListItem(updatedItem)
                //updateItemFromStorage
                StorageCtrl.updateItemFromStorage(updatedItem)
                 //clearEditState
                 UICtrl.clearEditState()
            }
        }

        //itemDeleteSubmit
        const itemDeleteSubmit = function (e) {
            //getCurrentItem;
            const currentItem = ItemCtrl.getCurrentItem()
            ItemCtrl.deleteItem(currentItem.id) 
            //deleteItemFormList
            UICtrl.deleteItemFormList(currentItem.id)
            //TotalStudent;
            const totalStudents=ItemCtrl.totalStudentPresent()
            UICtrl.setTotalStudents(totalStudents)
            StorageCtrl.deleteItemFromStorage(currentItem.id)
            //clearEditState
            UICtrl.clearEditState()

            e.preventDefault()
        }

        //clearAllItemsClick
        const clearAllItemsClick = function (e) {
            //removeAllItem
            ItemCtrl.removeAllItem()
            UICtrl.clearListItem()
            //TotalStudent;
            const totalStudents=ItemCtrl.totalStudentPresent()
            UICtrl.setTotalStudents(totalStudents)
            //clearItemsFromStorage
            StorageCtrl.clearItemsFromStorage()
            UICtrl.clearInput()
            e.preventDefault()
        }

        return{
            init: function () {
                //clearEditState
                UICtrl.clearEditState()
                const items = ItemCtrl.getItem()
                if (items.length === 0) {
                    UICtrl.hideList()
                } else {
                    //populateListItems
                UICtrl.populateListItems(items)
                //TotalStudent;
                const totalStudents=ItemCtrl.totalStudentPresent()
                UICtrl.setTotalStudents(totalStudents)
                }
                
                //loadEventListeners
                loadEventListeners()
            }

        }
    }
)(ItemCtrl,StorageCtrl,UICtrl)

App.init()



