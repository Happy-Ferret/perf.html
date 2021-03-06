/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow

import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import { CSSTransitionGroup } from 'react-transition-group';
import './FilterNavigatorBar.css';

type Props = {
  className: string,
  items: string[],
  onPop: number => *,
  selectedItem: number,
};

class FilterNavigatorBar extends PureComponent {
  props: Props;
  constructor(props: Props) {
    super(props);
    (this: any)._onLiClick = this._onLiClick.bind(this);
  }

  _onLiClick(e: SyntheticMouseEvent & { target: HTMLLIElement }) {
    const element = e.target.closest('.filterNavigatorBarItem');
    if (!(element instanceof HTMLElement)) {
      return;
    }
    const index = parseInt(element.dataset.index, 10) || 0;
    this.props.onPop(index);
  }

  render() {
    const { className, items, selectedItem } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="filterNavigatorBarTransition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component="ol"
        className={classNames('filterNavigatorBar', className)}
      >
        {items.map((item, i) =>
          <li
            key={i}
            data-index={i}
            className={classNames('filterNavigatorBarItem', {
              filterNavigatorBarRootItem: i === 0,
              filterNavigatorBarBeforeSelectedItem: i === selectedItem - 1,
              filterNavigatorBarSelectedItem: i === selectedItem,
              filterNavigatorBarLeafItem: i === items.length - 1,
            })}
            title={item}
            onClick={this._onLiClick}
          >
            <span className="filterNavigatorBarItemContent">
              {item}
            </span>
          </li>
        )}
      </CSSTransitionGroup>
    );
  }
}

FilterNavigatorBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.number.isRequired,
  onPop: PropTypes.func.isRequired,
};

export default FilterNavigatorBar;
