export const UserAvatar = ({ name }: { name: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 bg-purple-500 rounded-full text-white flex items-center justify-center text-xs">
      {name.charAt(0).toUpperCase()}
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);
