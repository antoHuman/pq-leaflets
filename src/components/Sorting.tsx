import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {TSortArray, TSortPossibilities} from "../types/sorting.types";
import {Axis, SortableContainer, SortableElement, SortEndHandler} from "react-sortable-hoc";
import arrayMove from 'array-move';
import {ListGroup} from "react-bootstrap";
import useMedia from "../hooks/useMedia";

type TSortableItemProps = {sortValue: TSortPossibilities};
type TSortableListProps = {items: TSortArray};

const SortableItem = SortableElement<TSortableItemProps>(({sortValue}: TSortableItemProps) => <ListGroup.Item>{sortValue}</ListGroup.Item>);

const SortableList = SortableContainer<TSortableListProps>(({items}: TSortableListProps) => {
  return (
    <ListGroup horizontal="md">
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} sortValue={value} />
      ))}
    </ListGroup>
  );
});


const Sorting: FC<{setSortArray: Dispatch<SetStateAction<TSortArray>>, sortArray: TSortArray}> = ({sortArray, setSortArray}) => {
  const handleSortEnd: SortEndHandler = (sort) => {
    setSortArray(prevState => arrayMove(prevState, sort.oldIndex, sort.newIndex))
  }
  const isBreakpointMd = useMedia('(min-width: 768px)');
  return (
    <div className="sorting">
      <p>Choose sorting method by dragging the value on the right:</p>
      <SortableList items={sortArray} onSortEnd={handleSortEnd} axis={isBreakpointMd ? 'x' : 'y'}/>
    </div>
  );
}

export default Sorting;
