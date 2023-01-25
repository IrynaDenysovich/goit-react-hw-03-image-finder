import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Component } from 'react';
import { fetchImages } from './api';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

import 'styles.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    loading: false,
    largeImageUrl: '',
    showButton: false,
    error: null,
  };

  perPage = 12;

  setLargeImageUrl = largeImageURL => {
    this.setState({ largeImageUrl: largeImageURL });
  };

  handleSubmit = event => {
    event.preventDefault();
    let form = event.target;
    let queryElement = form.elements.query;
    if (queryElement.value !== ''){
      this.setState({
        images: [],
        page: 1,
        query: queryElement.value,
      });
      form.reset();
    }
  };

  LoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ loading: true, error: null });

      try {
        const respData = await fetchImages(
          this.state.query,
          this.state.page,
          this.perPage
        );

        const newImages = respData.hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );

        const totalHits = this.state.page * this.perPage;
        const showButton = totalHits <= respData.totalHits;

        this.setState(prevState => ({
          showButton: showButton,
          images: [...prevState.images, ...newImages],
        }));
      } catch (error) {
        this.setState({ error: 'Что-то пошло не так, перегрузите страницу.' });
      } finally {
        this.setState({ loading: false });
      }
    }

    if (prevState.largeImageUrl !== this.state.largeImageUrl) {
      if (this.state.largeImageUrl.length > 0) {
        document.addEventListener('keydown', this.OnKeyDown);
      } else {
        document.removeEventListener('keydown', this.OnKeyDown);
      }
    }
  }

  OnKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.setLargeImageUrl('');
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit}></Searchbar>

        {this.state.error && <p>{this.state.error}</p>}
        <ImageGallery
          images={images}
          onSelect={this.setLargeImageUrl}
        ></ImageGallery>

        {this.state.largeImageUrl.length > 0 && (
          <Modal
            largeImageURL={this.state.largeImageUrl}
            setLargeImageUrl={this.setLargeImageUrl}
          ></Modal>
        )}
        {this.state.loading && <Loader></Loader>}
        {this.state.images.length > 0 && this.state.showButton && (
          <Button onClick={this.LoadMore}></Button>
        )}
      </div>
    );
  }
}
