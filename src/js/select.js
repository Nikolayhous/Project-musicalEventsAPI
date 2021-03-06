import apiService from './api-connect';
import { refs } from './refs';
import { creatGalleryCards} from './input-search';
import {onError} from './input-search';
import {paginationNone} from './input-search';
import { setPagination } from './pagination';



refs.inputCountry.addEventListener('change', onChangeCountries);
refs.boxSelect.addEventListener('click',onIconMoveClick)
refs.inputCountry.addEventListener('mouseover', onIconManipulate);

//ф-ція повороту іконки
function onIconMoveClick(){
refs.countryIcon.style.transform = (refs.countryIcon.style.transform == 'rotate(180deg)') ? 'rotate(0deg)' : 'rotate(180deg)'
}
//ф-ція для кнопки-стає пробивна
function onIconManipulate(e){
    if(e.target.tagName === 'SELECT' ){
        refs.countryBtn.classList.add('hidebtn')
    } 
    else {

       refs.countryBtn.classList.remove('hidebtn') 
    }
} 
//ф-ція ренду карток по країнах
function onChangeCountries(e){
    e.preventDefault();
    const countryCode = refs.inputCountry.value;
  const keyword = refs.nameInput.value;
    refs.eventList.innerHTML = '';
    const fetch = apiService(keyword, 0, 20, countryCode);
    fetch.then(data => {
        const totalElements = data.page.totalElements;

        if( countryCode === 'All countries'){
            return;
        }

        if (totalElements === 0){
            paginationNone();
            onError();      
        } else   
        refs.pagination.classList.remove('tui-pagination--none');


        creatGalleryCards(data._embedded.events);
        setPagination(totalElements);

    } )
    .catch(err => {
        onError()
    })
};
