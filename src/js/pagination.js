import Pagination from 'tui-pagination';
import apiService from '../services/api-services';
import { refs } from './refs';
import cardTmp from '../templates/eventsGallery';
import { openModal } from '../js/modal-close';
import { eventsArr } from '../js/variables';
import newApi from "./api-connect"

document.addEventListener('DOMContentLoaded', onStartEventsLoad);

export function onStartEventsLoad() {
  apiService.resetPage();
  setEventsOnPage();

  apiService.fetchEvent().then(data => {
    setPagination(data.page.totalElements);

  });
}

export function setPagination(totalEvents) {
  const options = {
    totalItems:    totalEvents > 1000 ? 1000 : totalEvents    ,

    itemsPerPage: apiService.size,
    visiblePages: window.outerWidth < 768 ? 3 : 5,
    page: 1,
    centerAlign: true,
  };

  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', function (eventData) {
 
    apiService.page = eventData.page - 1;
    apiService.keyword = refs.nameInput.value.trim();

    setEventsOnPage();
    newApi().then(data => {
      renderGallery(apiService.keyword, apiService.page);
    });
      
  });
}

function PageToTop() {
  window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
  });

}
function setEventsOnPage() {
  PageToTop();
}

function renderGallery(inputText = '', newPage = 0) {

newApi(inputText, newPage, 20, '').then(data => {
  const event = data._embedded.events.map(evt => ({
    ...evt,
    imgUrl: evt.images.find(img => img.width === 1024 && img.height === 683),
    locationRef: evt._embedded.venues,
  }));

     refs.eventList.innerHTML = cardTmp(event);

             //код Юли для открытия модалки
  eventsArr.splice(0, 20);
  eventsArr.push(...event);
  document
    .querySelectorAll('.events__item')
    .forEach(event => event.addEventListener('click', openModal));
  });
}
export default setPagination;