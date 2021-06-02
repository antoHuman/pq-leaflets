import { Dispatch, FC, SetStateAction} from "react";
import {TSortArray, TSortPossibilities} from "../types/sorting.types";
import {SortableContainer, SortableElement, SortEndHandler} from "react-sortable-hoc";
import arrayMove from 'array-move';
import {ListGroup} from "react-bootstrap";

type TSortableItemProps = {sortValue: TSortPossibilities};
type TSortableListProps = {items: TSortArray};

const SortableItem = SortableElement<TSortableItemProps>(({sortValue}: TSortableItemProps) => <ListGroup.Item>{sortValue}</ListGroup.Item>);

const SortableList = SortableContainer<TSortableListProps>(({items}: TSortableListProps) => {
  return (
    <ListGroup horizontal>
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
  return (
    <div className="sorting">
      <h3>Sort by drag</h3>
      <SortableList items={sortArray} onSortEnd={handleSortEnd} axis={'x'}/>
    </div>
  );
}

export default Sorting;
