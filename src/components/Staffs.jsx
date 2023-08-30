import '../pages/MovieDetail.css';

export default function Staffs({ staff }) {
  return (
    <>
      <span className="staff-name">{staff.name}</span>
      <span className="staff-role">{staff.role}</span>
    </>
  )
}