import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssuesFilter,
  FilterButton,
  IssueList,
  Pagination,
  PaginationPrev,
  PaginationNext
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { value: 'all', label: 'Todos', selected: true },
      { value: 'open', label: 'Aberto', selected: false },
      { value: 'closed', label: 'Fechado', selected: false }
    ],
    updating: false,
    paginationIndex: 1,
    firstPage: true,
    lastPage: false
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 30,
        }
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      lastPage: issues.data.length < 30
    });
  }

  handleFilterChange = e => {
    const newFilters = this.state.filters.map(f => {
      return { ...f, selected: f.value === e.target.value };
    });

    this.setState({ filters: newFilters });
  }

  filterIssues = async () => {
    this.setState({ loading: true });

    const { match } = this.props;
    const { value: filterStatus } = this.state.filters.find(f => f.selected);

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues?state=${filterStatus}`, {
      params: {
        per_page: 30,
      }
    });

    this.setState({
      issues: response.data,
      loading: false,
      firstPage: true,
      lastPage: response.data.length < 30
    });
  }

  changePage = async (pageNumber) => {
    this.setState({ updating: true });

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        page: pageNumber
      }
    });

    this.setState({
      issues: response.data,
      paginationIndex: pageNumber,
      updating: false,
      firstPage: pageNumber === 1,
      lastPage: response.data.length < 30
    });
  }

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      updating,
      paginationIndex,
      firstPage,
      lastPage
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesFilter>
          <h3>Filtrar por status</h3>

          <select
            name="status"
            id="status"
            value={filters.find(f => f.selected).value}
            onChange={this.handleFilterChange}
          >
            {filters.map(filter => (
              <option
                key={filter.value}
                value={filter.value}
                selected={filter.selected}
              >
                {filter.label}
              </option>
            ))}
          </select>

          <FilterButton onClick={this.filterIssues}>Filtrar</FilterButton>
        </IssuesFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          <PaginationPrev
            firstPage={firstPage}
            updating={updating ? 1 : 0}
            onClick={() => {  this.changePage(paginationIndex - 1) }}
          >
            { updating ? (
              <FaSpinner color="FFF" size={14} />
            ) : (
              <span>Anterior</span>
            ) }
          </PaginationPrev>

          <PaginationNext
            lastPage={lastPage}
            updating={updating ? 1 : 0}
            onClick={() => {  this.changePage(paginationIndex + 1) }}
          >
            { updating ? (
              <FaSpinner color="FFF" size={14} />
            ) : (
              <span>Próximo</span>
            ) }
          </PaginationNext>
        </Pagination>
      </Container>
    );
  }
}
