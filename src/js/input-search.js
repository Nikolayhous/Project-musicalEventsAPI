import apiService from './api-connect';
import { refs } from './refs';
import cardTmp from '../templates/eventsGallery'; 
import { openModal } from '../js/modal-close';
import { eventsArr } from '../js/variables';
import { setPagination } from './pagination';
import {createEventsAfterClick} from './clear-btn'

import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

refs.form.addEventListener('submit', handlerInput)

function handlerInput(e){
  e.preventDefault();
  const keyword = refs.nameInput.value.trim();
   refs.eventList.innerHTML = '';
   const obj = apiService(keyword, 0, 20, );
  obj.then(data => {
    const totalElements = data.page.totalElements;
    setPagination(totalElements);

if (totalElements) {
  refs.pagination.classList.remove('tui-pagination--none')
} else 
paginationNone();

    if (keyword.length === 0)  {
      return  creatGalleryCards(data._embedded.events);

    } if (keyword.length === 1) {
         error({
          text: 'Please. Enter the correct data to search for music events.',
          delay: 2000,
        });

        setTimeout(() => {
          createEventsAfterClick()
        }, 2000);
    }
    else {
      creatGalleryCards(data._embedded.events);

    }
  })
   .catch(err => {
     paginationNone(); 
     onError()
    
     setTimeout(() => {
      createEventsAfterClick()
    }, 2000);
    refs.pagination.classList.remove('tui-pagination--none');
    
    }

     
  )
}

export function paginationNone() {
  refs.pagination.classList.add('tui-pagination--none')
}

export function onError(){
  error({
    text: 'No results found.',
    delay: 2000,
  });
}

  export function creatGalleryCards(data) {
         refs.eventList.insertAdjacentHTML('afterbegin', cardTmp(data));

         //код Юли для открытия модалки
         eventsArr.splice(0, 20);
         eventsArr.push(...data);
      document
        .querySelectorAll('.events__item')
        .forEach(event => event.addEventListener('click', openModal));

   }

   