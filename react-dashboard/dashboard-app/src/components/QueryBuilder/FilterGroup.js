import React from "react";
import { Select } from "antd";
import MemberDropdown from "./MemberDropdown";
import RemoveButtonGroup from "./RemoveButtonGroup";
import FilterInput from "./FilterInput";
import PlusIcon from "./PlusIcon";

const FilterGroup = ({
  members,
  availableMembers,
  addMemberName,
  updateMethods
}) => (
  <span>
    {members.map(m => (
      <div style={{ marginBottom: 12 }} key={m.index}>
        <RemoveButtonGroup onRemoveClick={() => updateMethods.remove(m)}>
          <MemberDropdown
            type='selected-filter'
            onClick={updateWith =>
              updateMethods.update(m, { ...m, dimension: updateWith })
            }
            availableMembers={availableMembers}
            style={{
              width: 150,
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {m.dimension.title}
          </MemberDropdown>
        </RemoveButtonGroup>
        <Select
          value={m.operator}
          onChange={operator => updateMethods.update(m, { ...m, operator })}
          style={{ width: 200, marginRight: 8 }}
        >
          {m.operators.map(operator => (
            <Select.Option key={operator.name} value={operator.name}>
              {operator.title}
            </Select.Option>
          ))}
        </Select>
        <FilterInput
          member={m}
          key='filterInput'
          updateMethods={updateMethods}
        />
      </div>
    ))}
    <MemberDropdown
      onClick={m => updateMethods.add({ dimension: m })}
      availableMembers={availableMembers}
      type='new'
    >
      {addMemberName}
      <PlusIcon />
    </MemberDropdown>
  </span>
);

export default FilterGroup;
