import {
    useEffect,
    useState,
  } from "react";
  
  import {
    getOwnerConfiguration,
    getOwnerLeads,
  } from "../services/owner.service";
  
  import { useAuth } from "../context/AuthContext";

  import ModifierEditor from "../components/owner/ModifierEditor";

import QuestionEditor from "../components/owner/QuestionEditor";

import LeadsTable from "../components/owner/LeadsTable";

import {
  updateOwnerConfiguration,
} from "../services/owner.service";
  
const OwnerDashboard = () => {
    const {
        user,
        logout,
      } = useAuth();

    const [
        editedConfiguration,
        setEditedConfiguration,
      ] = useState(null);
      
    const [saving, setSaving] =
        useState(false);
      
    const [saveMessage, setSaveMessage] =
        useState("");
  
    const [configuration, setConfiguration] =
      useState(null);
  
    const [leads, setLeads] = useState([]);
  
    const [loading, setLoading] =
      useState(true);
  
    const [error, setError] =
      useState("");

    const handleSaveConfiguration =
      async () => {
        if (!editedConfiguration) {
          return;
        }
    
        try {
          setSaving(true);
          setSaveMessage("");
    
          const newConfiguration =
            await updateOwnerConfiguration({
              business:
                editedConfiguration.business,
    
              questions:
                editedConfiguration.questions,
    
              modifiers:
                editedConfiguration.modifiers,
            });
    
          setConfiguration(
            newConfiguration
          );
    
          setEditedConfiguration(
            structuredClone(
              newConfiguration
            )
          );
    
          setSaveMessage(
            `Configuration v${newConfiguration.version} is now active.`
          );
        } catch (err) {
          console.error(err);
    
          setSaveMessage(
            err?.response?.data?.message ||
              "Unable to save configuration."
          );
        } finally {
          setSaving(false);
        }
      };
  
    useEffect(() => {
      const loadDashboard =
        async () => {
          try {
            setLoading(true);
            setError("");
  
            const [
              config,
              leadData,
            ] = await Promise.all([
              getOwnerConfiguration(),
              getOwnerLeads(),
            ]);
  
            setConfiguration(config);
            setEditedConfiguration(
                structuredClone(config)
            );
            setLeads(leadData);
          } catch (err) {
            console.error(err);
  
            setError(
              err?.response?.data?.message ||
                "Unable to load dashboard."
            );
          } finally {
            setLoading(false);
          }
        };
  
      loadDashboard();
    }, []);
  
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">
            Loading owner dashboard...
          </p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="text-center">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Owner Portal
              </p>
  
              <h1 className="text-xl font-bold text-gray-900">
                Northline Roofing & Exteriors
              </h1>
            </div>
  
            <div className="flex items-center gap-4">
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-gray-900">
                    {user.email}
                    </p>

                    <p className="text-xs text-gray-500">
                    Configuration v
                    {configuration.version}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={logout}
                    className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Logout
                </button>
                </div>

          </div>
        </header>
  
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mt-8 space-y-6">

            <ModifierEditor
            modifiers={
                editedConfiguration.modifiers
            }
            onChange={(modifiers) =>
                setEditedConfiguration(
                (previous) => ({
                    ...previous,
                    modifiers,
                })
                )
            }
            />

            {editedConfiguration.questions.map(
            (question) => (
                <QuestionEditor
                key={question.key}
                question={question}
                onChange={(updatedQuestion) =>
                    setEditedConfiguration(
                    (previous) => ({
                        ...previous,

                        questions:
                        previous.questions.map(
                            (item) =>
                            item.key ===
                            updatedQuestion.key
                                ? updatedQuestion
                                : item
                        ),
                    })
                    )
                }
                />
            )
            )}

            {saveMessage && (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
                {saveMessage}
            </div>
            )}

            <div className="flex justify-end">
            <button
                type="button"
                onClick={handleSaveConfiguration}
                disabled={saving}
                className="rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {saving
                ? "Saving..."
                : "Save configuration"}
            </button>
            </div>

            </div>

            <div className="mt-12">
            <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                Leads
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                Homeowners who have submitted an estimate.
                </p>
            </div>

            <LeadsTable leads={leads} />
            </div>
        </main>

        
      </div>
    );
  };
  
  export default OwnerDashboard;