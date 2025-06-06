import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Loader2, X } from 'lucide-react';

// Adjusted to match the design system
const FormInput = ({ label, id, ...props }: { label: string, id: string, [key: string]: any }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">{label}</label>
        <input id={id} className="bg-dark-200 border border-dark-100 focus:border-primary-400 focus:ring-primary-400/50 text-white text-sm rounded-lg block w-full p-2.5 transition-colors" {...props} />
    </div>
);

const FormSelect = ({ label, id, children, ...props }: { label: string, id: string, children: React.ReactNode, [key: string]: any }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">{label}</label>
        <select id={id} className="bg-dark-200 border border-dark-100 focus:border-primary-400 focus:ring-primary-400/50 text-white text-sm rounded-lg block w-full p-2.5 transition-colors" {...props}>
            {children}
        </select>
    </div>
);

const FormSlider = ({ label, id, value, onChange, min, max, step, unit = '' }: { label: string; id: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min: number; max: number; step: number; unit?: string; }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">
            {label} <span className="font-bold text-primary-400">{value}{unit}</span>
        </label>
        <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer range-thumb:bg-primary-400" style={{ accentColor: 'var(--color-primary-400)' }} />
    </div>
);

const CreateVaultModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [vaultName, setVaultName] = useState('');
  const [depositAsset, setDepositAsset] = useState('SUI');
  const [strategyDescription, setStrategyDescription] = useState('');
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [managementFee, setManagementFee] = useState(0);
  const [carry, setCarry] = useState(0);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Advanced Settings State
  const [lockInDays, setLockInDays] = useState(0);
  const [earlyExitPenaltyEnabled, setEarlyExitPenaltyEnabled] = useState(false);
  const [earlyExitPenalty, setEarlyExitPenalty] = useState(0);
  const [vaultCap, setVaultCap] = useState<number | ''>('');
  const [riskGrade, setRiskGrade] = useState('B');
  const [tagline, setTagline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportedAssets = ['SUI', 'USDC', 'USDT', 'wETH', 'wBTC', 'afSUI', 'sSUI'];
  const supportedProtocols = ['Bucket', 'Navi', 'Aftermath', 'Streamm', 'Suilend', 'Scallop', 'Typus'];

  const handleProtocolChange = (protocol: string) => {
    setSelectedProtocols(prev => 
      prev.includes(protocol) ? prev.filter(p => p !== protocol) : [...prev, protocol]
    );
  };

  const handleValidation = () => {
    if (lockInDays === 0 && earlyExitPenaltyEnabled) {
      alert("Early Exit Penalty cannot be set when Lock-in Period is 0 days.");
      return false;
    }
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialChars.test(vaultName)) {
      alert("Vault Name contains special characters, which are not allowed.");
      return false;
    }
    if (!vaultName.trim()) {
      alert("Vault Name is required.");
      return false;
    }
    return true;
  };
  
  const handleNextStep = () => {
    if (handleValidation()) {
      setStep('review');
    }
  };

  const handleDeploy = () => {
    setIsSubmitting(true);
    console.log("Submitting to backend:", allFormData);

    // Simulate API call and wallet signing
    setTimeout(() => {
      console.log("Deployment successful!");
      setIsSubmitting(false);
      onClose(); // Close modal on success
    }, 2000);
  };

  const allFormData = { "Vault Name": vaultName, "Deposit Asset": depositAsset, "Selected Protocols": selectedProtocols, "Management Fee (%)": managementFee, "Carry (%)": carry, "Lock-in (Days)": lockInDays, "Vault Cap (USD)": vaultCap === '' ? 'Unlimited' : vaultCap, "Risk Grade": riskGrade, "Tagline": tagline, "Early Exit Penalty (%)": earlyExitPenaltyEnabled ? earlyExitPenalty : "Disabled" };

  if (!isOpen) return null;

  const renderForm = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create New Vault</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
      </div>
      <p className="text-sm text-white/60 mb-8">Step 1 · Set Parameters</p>
      <div className="space-y-8">
        {/* Basic Information Section */}
        <div>
          <h3 className="text-lg font-semibold border-b border-dark-100 pb-3 mb-4 text-white/90">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                  label="Vault Name"
                  id="vaultName"
                  type="text"
                  placeholder="e.g., Wing Alpha"
                  value={vaultName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVaultName(e.target.value)}
                  required
              />
              <FormSelect
                  label="Deposit Asset"
                  id="depositAsset"
                  value={depositAsset}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDepositAsset(e.target.value)}
              >
                  {supportedAssets.map(asset => <option key={asset} value={asset}>{asset}</option>)}
              </FormSelect>
          </div>
          <div className="mt-6">
            <label htmlFor="strategyDescription" className="block text-sm font-medium text-white/80 mb-2">Strategy Description</label>
            <textarea 
              id="strategyDescription" 
              rows={3}
              className="bg-dark-200 border border-dark-100 focus:border-primary-400 focus:ring-primary-400/50 text-white text-sm rounded-lg block w-full p-2.5 transition-colors"
              placeholder="Describe your vault's strategy (max 100 chars)"
              value={strategyDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setStrategyDescription(e.target.value)}
              maxLength={100}
            />
          </div>
           <div className="mt-6">
            <label className="block text-sm font-medium text-white/80 mb-2">Strategy Protocols</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {supportedProtocols.map(protocol => (
                <button
                  key={protocol}
                  type="button"
                  onClick={() => handleProtocolChange(protocol)}
                  className={`text-sm text-center py-2 px-3 rounded-md transition-colors font-medium ${selectedProtocols.includes(protocol) ? 'bg-primary-500 text-white shadow-lg' : 'bg-dark-200 hover:bg-dark-100'}`}
                >
                  {protocol}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormSlider
              label="Management Fee"
              id="managementFee"
              min={0}
              max={5} // Assuming a max of 5% for now
              step={0.1}
              value={managementFee}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManagementFee(parseFloat(e.target.value))}
              unit="%"
            />
            <FormSlider
              label="Carry (Performance Fee)"
              id="carry"
              min={0}
              max={30}
              step={1}
              value={carry}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCarry(parseFloat(e.target.value))}
              unit="%"
            />
          </div>
        </div>

        {/* Advanced Settings Section */}
        <div>
          <button 
            type="button"
            className="w-full flex justify-between items-center text-lg font-semibold border-b border-dark-100 pb-3 mb-4 text-white/90"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <span>Advanced Settings</span>
            <ChevronDown 
              className={`transform transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          {isAdvancedOpen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Min Lock-in Period */}
              <FormInput
                label="Min Lock-in Period (Days)"
                id="lockInDays"
                type="number"
                min={0}
                max={365}
                value={lockInDays}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLockInDays(parseInt(e.target.value))}
              />
              
              {/* Vault Cap */}
              <FormInput
                label="Vault Cap (USD)"
                id="vaultCap"
                type="number"
                placeholder="Unlimited"
                value={vaultCap}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVaultCap(e.target.value === '' ? '' : parseInt(e.target.value))}
              />

              {/* Early Exit Penalty */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">Early Exit Penalty</label>
                <div className="flex items-center space-x-4">
                  <label htmlFor="earlyExitToggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id="earlyExitToggle" className="sr-only" checked={earlyExitPenaltyEnabled} onChange={() => setEarlyExitPenaltyEnabled(!earlyExitPenaltyEnabled)} />
                      <div className="block bg-dark-200 w-14 h-8 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                    </div>
                  </label>
                  <FormInput
                    label=""
                    id="earlyExitPenalty"
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={earlyExitPenalty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEarlyExitPenalty(parseFloat(e.target.value))}
                    disabled={!earlyExitPenaltyEnabled || lockInDays === 0}
                    placeholder={lockInDays === 0 ? "N/A (No lock-in)" : "Penalty %"}
                  />
                </div>
              </div>

              {/* Risk Grade */}
              <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">Risk Grade</label>
                  <div className="flex space-x-2 bg-dark-200 p-1 rounded-lg">
                      {['A', 'B', 'C', 'D'].map(grade => (
                          <button
                              key={grade}
                              type="button"
                              onClick={() => setRiskGrade(grade)}
                              className={`w-full text-sm py-2 px-4 rounded-md transition-colors font-semibold ${riskGrade === grade ? 'bg-primary-500 text-white shadow' : 'text-white/60 hover:bg-dark-100'}`}
                          >
                              {grade}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Tagline */}
              <div className="col-span-1 md:col-span-2">
                  <label htmlFor="tagline" className="block text-sm font-medium text-white/80 mb-2">Tagline</label>
                  <textarea 
                      id="tagline" 
                      rows={2}
                      className="bg-dark-200 border border-dark-100 focus:border-primary-400 focus:ring-primary-400/50 text-white text-sm rounded-lg block w-full p-2.5 transition-colors"
                      placeholder="A short, catchy description for your vault (max 160 chars)"
                      value={tagline}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTagline(e.target.value)}
                      maxLength={160}
                  />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 flex justify-end space-x-4">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={handleNextStep} className="btn-primary">Review & Create</button>
      </div>
    </>
  );

  const renderReview = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Review & Sign</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
      </div>
      <p className="text-sm text-white/60 mb-8">Step 2 · Review & Sign</p>
      <div className="space-y-3 bg-dark-400 p-6 rounded-lg border border-dark-100">
        {Object.entries(allFormData).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-base border-b border-dark-100 pb-2">
            <span className="text-white/80">{key}</span>
            <span className="text-white font-semibold text-right break-all">{Array.isArray(value) ? value.join(', ') || '-' : value.toString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-between items-center">
        <button onClick={() => setStep('form')} disabled={isSubmitting} className="btn-secondary flex items-center disabled:opacity-50">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <button onClick={handleDeploy} disabled={isSubmitting} className="btn-primary flex items-center justify-center w-40 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign & Deploy'}
        </button>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-dark-500/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-dark-300 border border-dark-100 text-white rounded-lg shadow-xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        {step === 'form' ? renderForm() : renderReview()}
      </div>
    </div>
  );
};

export default CreateVaultModal; 