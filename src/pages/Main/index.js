import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, Input, SubmitButton, ErrorLabel, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    submitError: false,
    errorMessage: ''
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
      submitError: false,
      errorMessage: '',
    });
  }

  handleSubmit = async e => {
    let duplicateRepo;

    try {
      e.preventDefault();

      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      duplicateRepo = repositories.find(repository => {
        return repository.name.toLowerCase() === newRepo.toLowerCase();
      });

      if (duplicateRepo) {
        throw Error('Repositório duplicado!');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch(err) {
      this.setState({
        loading: false,
        submitError: true,
        errorMessage: duplicateRepo
          ? 'Repositório duplicado'
          : 'Repositório não encontrado'
      });
    }
  }

  render() {
    const {
      newRepo,
      repositories,
      loading,
      submitError,
      errorMessage
    } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <div>
            <Input
              type="text"
              placeholder="Adicionar repositório"
              submitError={submitError ? 1 : 0}
              value={newRepo}
              onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
              { loading ? (
                <FaSpinner color="FFF" size={14} />
              ) : (
                <FaPlus color="#FFF" size={14} />
              ) }
            </SubmitButton>
          </div>

          { submitError && <ErrorLabel>* {errorMessage}</ErrorLabel> }
        </Form>

        <List>
         {repositories.map(repository => (
           <li key={repository.name}>
             <span>{repository.name}</span>
             <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
           </li>
         ))}
        </List>
      </Container>
    );
  }
}
