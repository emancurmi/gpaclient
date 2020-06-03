import React, { Component } from 'react';
import Application from './Application/Application';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            search: '',
            sort: '',
            error: null
        }
    }

    setSearch(search) {
        this.setState({
            search
        });
    }

    setSort(sort) {
        this.setState({
            sort
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const baseUrl = 'http://localhost:8000/apps';
        const params = [];
        if (this.state.search) {
            params.push(`search=${this.state.search}`);
        }
        if (this.state.sort) {
            params.push(`sort=${this.state.sort}`);
        }
        const query = params.join('&');
        const url = `${baseUrl}?${query}`;

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    applications: data,
                    error: null
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: 'Sorry, could not get application at this time.'
                });
            })

    }

    render() {
        const applications = this.state.applications.map((application, i) => {
            return <Application {...application} key={i} />
        })
        return (
            <main className="App">
                <h1>NYT Best Sellers</h1>
                <div className="search">
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <label htmlFor="search">Search: </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={this.state.search}
                            onChange={e => this.setSearch(e.target.value)} />

                        <label htmlFor="sort">Sort: </label>
                        <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
                            <option value="">None</option>
                            <option value="title">Title</option>
                            <option value="rank">Rank</option>
                        </select>
                        <button type="submit">Search</button>
                    </form>
                    <div className="App_error">{this.state.error}</div>
                </div>
                {applications}
            </main>
        );
    }
}

export default App;