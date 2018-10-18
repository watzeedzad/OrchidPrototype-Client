import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles/index';
import {Hidden, Icon, IconButton, Input, Paper, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate, FuseSelectedTheme} from '@fuse';
import { debounce } from 'lodash';
import SearchBar from '../../../Utils/searchBar'

const styles = theme => ({
    root: {}
});

class UserHeader extends Component {

    render()
    {
        const {classes, setSearchText, searchText, pageLayout} = this.props;

        const userSearch = debounce(term => { this.props.handleSearch(term) }, 200);

        return (
            <div className={classNames(classes.root, "flex flex-1 items-center justify-between p-8 sm:p-24")}>

                <div className="flex flex-shrink items-center sm:w-224">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">Contacts</Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                    <MuiThemeProvider theme={FuseSelectedTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <SearchBar
                                    onSearchTermChange={userSearch}
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    placeholder="ค้นหา..." 
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}/>

                                {/* <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    // value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    // onChange={setSearchText}
                                /> */}
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>
            </div>
        )
            ;
    }
}


export default withStyles(styles, {withTheme: true})(UserHeader);
