const ParticipantCard = ({ participant }) => {
  const { fullName, email, dateOfBirth, referralSource } = participant;

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-md">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{fullName}</div>
        <p className="text-gray-700 text-base">Email: {email}</p>
        <p className="text-gray-700 text-base">Date of Birth: {dateOfBirth}</p>
        <p className="text-gray-700 text-base">
          Referral Source: {referralSource}
        </p>
      </div>
    </div>
  );
};

export default ParticipantCard;
