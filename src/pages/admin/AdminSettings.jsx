import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Bell, Shield, Globe } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      {/* Platform Settings */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
            <Globe size={18} className="text-violet-600" />
          </div>
          <h2 className="font-semibold text-slate-900">Platform Settings</h2>
        </div>
        <div className="space-y-4">
          <Input label="Platform Name" defaultValue="StartHub" />
          <Input label="Support Email" type="email" defaultValue="support@starthub.com" />
          <Input label="Platform Fee (%)" type="number" defaultValue="5" />
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
            <Shield size={18} className="text-green-600" />
          </div>
          <h2 className="font-semibold text-slate-900">Security</h2>
        </div>
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />
        </div>
      </div>

      <Button onClick={handleSave}>
        {saved ? '✓ Saved!' : 'Save Changes'}
      </Button>
    </div>
  );
}
