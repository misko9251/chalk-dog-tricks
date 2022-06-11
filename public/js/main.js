const deleteText = document.querySelectorAll('.trash1')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteKnown)
})

async function deleteKnown(){
    const trickName = this.parentNode.childNodes[1].innerText
    console.log(trickName)
    try{
        const response = await fetch('deleteKnown', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'trickToDelete': trickName
              })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

const deleteText2 = document.querySelectorAll('.trash2')

Array.from(deleteText2).forEach((element)=>{
    element.addEventListener('click', deleteLearning)
})

async function deleteLearning(){
    const trickName2 = this.parentNode.childNodes[1].innerText
    console.log(trickName2)
    try{
        const response = await fetch('deleteLearning', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'removeTrick': trickName2
              })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
