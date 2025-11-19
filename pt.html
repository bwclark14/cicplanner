import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, serverTimestamp } from 'firebase/firestore';

// --- Curriculum Model Data ---

const LEVELS = ["Early Years", "Level 1", "Level 2", "Level 3", "Level 4"];

const CURRICULUM_DATA = [
    {
        area: "Technologies",
        color: "bg-blue-600",
        bigIdeas: [
            {
                idea: "Computational Thinking",
                concepts: [
                    {
                        name: "Algorithm Design",
                        description: "Understanding the steps and structure required to solve a problem.",
                        statements: [
                            { subject: "Computing Science", level: "Early Years", type: "Know", text: "I know that instructions must be clear and specific for a successful outcome." },
                            { subject: "Computing Science", level: "Level 1", type: "Do", text: "I can follow a simple, two-step set of instructions accurately, identifying the start and end points." },
                            { subject: "Computing Science", level: "Level 2", type: "Know", text: "I know that algorithms are a sequence of ordered steps used to solve a problem or achieve a goal (sequential logic)." },
                            { subject: "Computing Science", level: "Level 3", type: "Do", text: "I can design, test, and debug a simple algorithm using pseudocode or visual blocks, including iteration (loops)." },
                            { subject: "Design and Technology", level: "Level 3", type: "Know", text: "I know that efficient production requires a logical sequence of steps and resources." },
                            { subject: "Design and Technology", level: "Level 4", type: "Do", text: "I can refine and optimise an existing design process to reduce waste and time, justifying the changes based on performance metrics." },
                            { subject: "Business Education", level: "Level 4", type: "Do", text: "I can model complex business processes using flowcharts to identify inefficiencies and single points of failure." }
                        ]
                    },
                    {
                        name: "Data Representation",
                        description: "How data is collected, stored, and managed digitally.",
                        statements: [
                            { subject: "Computing Science", level: "Level 3", type: "Know", text: "I know that all digital data (text, images, sound) can be represented in binary form (bits and bytes) and understand the concept of a sampling rate." },
                            { subject: "Computing Science", level: "Level 4", type: "Do", text: "I can convert simple denary numbers to binary and vice versa, explaining the limits of storage and the trade-offs of different compression techniques." },
                            { subject: "Business Education", level: "Level 2", type: "Know", text: "I know that personal data must be stored securely and responsibly according to privacy laws (e.g., GDPR principles)." }
                        ]
                    }
                ]
            },
            {
                idea: "Digital Literacy and Safety",
                concepts: [
                    {
                        name: "Digital Citizenship",
                        description: "Understanding responsible, ethical, and safe use of technology.",
                        statements: [
                            { subject: "Computing Science", level: "Level 1", type: "Know", text: "I know I must ask permission before sharing photos of myself or others online." },
                            { subject: "Computing Science", level: "Level 3", type: "Do", text: "I can evaluate online sources for bias, credibility, and accuracy using multiple checks." },
                            { subject: "Computing Science", level: "Level 4", type: "Do", text: "I can apply advanced privacy settings to manage my digital footprint and understand the permanence of online actions." }
                        ]
                    }
                ]
            }
        ]
    },
    {
        area: "Expressive Arts",
        color: "bg-purple-600",
        bigIdeas: [
            {
                idea: "Creativity and Imagination",
                concepts: [
                    {
                        name: "Idea Generation and Exploration",
                        description: "Developing original concepts and exploring various artistic forms.",
                        statements: [
                            { subject: "Art", level: "Early Years", type: "Do", text: "I can explore different materials and textures to create marks and expressive pieces, naming the colors I use." },
                            { subject: "Drama", level: "Level 1", type: "Do", text: "I can use my voice, movement, and body to represent simple characters and express basic emotions in short role-play." },
                            { subject: "Music", level: "Level 2", type: "Know", text: "I know that musical compositions have structure (e.g., A/B sections, verse/chorus) and that elements like tempo and dynamics influence mood." },
                            { subject: "Art", level: "Level 3", type: "Know", text: "I know about the work of historical artists from different cultures and how their techniques relate to my own work." },
                            { subject: "Drama", level: "Level 4", type: "Know", text: "I know how complex technical elements like lighting states, sound cues, and staging contribute to the atmosphere and narrative of a performance." },
                            { subject: "Music", level: "Level 4", type: "Do", text: "I can improvise melodies over a given chord progression, demonstrating musical sensitivity and awareness of key signatures." }
                        ]
                    },
                    {
                        name: "Performance and Presentation",
                        description: "The execution of artistic work for an audience.",
                        statements: [
                            { subject: "Drama", level: "Level 3", type: "Do", text: "I can perform a short monologue or scene with controlled voice, confidence, and appropriate expression, justifying my character choices." },
                            { subject: "Music", level: "Level 4", type: "Do", text: "I can read and interpret complex musical notation (including ledger lines and syncopation) and perform a piece accurately in an ensemble." },
                            { subject: "Art", level: "Level 2", type: "Know", text: "I know how to safely display and present my artwork to others, considering composition and context." },
                            { subject: "Art", level: "Level 4", type: "Do", text: "I can professionally curate and present a portfolio of work, documenting my process and explaining my creative rationale and critical intent." }
                        ]
                    }
                ]
            },
            {
                idea: "Aesthetic Appreciation",
                concepts: [
                    {
                        name: "Critical Analysis",
                        description: "Evaluating and interpreting artistic works.",
                        statements: [
                            { subject: "Art", level: "Level 2", type: "Do", text: "I can use simple descriptive language (e.g., texture, line, color) to talk about the artwork of others." },
                            { subject: "Drama", level: "Level 3", type: "Know", text: "I know that context (historical, social, political) influences the meaning of an artwork or performance." },
                            { subject: "Music", level: "Level 4", type: "Do", text: "I can write a critical review of a musical performance or composition, justifying my opinions with reference to musical theory and stylistic conventions." }
                        ]
                    }
                ]
            }
        ]
    },
    {
        area: "Health and Wellbeing",
        color: "bg-green-600",
        bigIdeas: [
            {
                idea: "Emotional Resilience",
                concepts: [
                    {
                        name: "Self-Awareness and Regulation",
                        description: "Recognising and managing personal emotions and reactions.",
                        statements: [
                            { subject: "Health and Wellbeing", level: "Early Years", type: "Know", text: "I can name common feelings like happy, sad, or angry and point to where I feel them in my body." },
                            { subject: "Health and Wellbeing", level: "Level 1", type: "Do", text: "I can identify a safe adult to talk to when I am upset and use a simple calming strategy like counting to five." },
                            { subject: "Health and Wellbeing", level: "Level 2", type: "Know", text: "I know that managing my breathing and thinking positive thoughts can help me feel calm and handle frustration." },
                            { subject: "Health and Wellbeing", level: "Level 3", type: "Do", text: "I can use and choose from various strategies, like mindfulness, sport, or writing, to manage stress effectively." },
                            { subject: "Health and Wellbeing", level: "Level 4", type: "Know", text: "I know the impact of both positive and negative self-talk on my mental health and recognise signs of emotional distress in myself and others." },
                            { subject: "Health and Wellbeing", level: "Level 4", type: "Do", text: "I can initiate and maintain healthy boundaries in relationships and seek professional help when needed." }
                        ]
                    }
                ]
            },
            {
                idea: "Physical Development",
                concepts: [
                    {
                        name: "Physical Literacy",
                        description: "The motivation, confidence, physical competence, knowledge, and understanding to value and take responsibility for engagement in physical activities for life.",
                        statements: [
                            { subject: "PE", level: "Early Years", type: "Do", text: "I can move my body in different basic ways (running, hopping, skipping) and balance on one foot briefly." },
                            { subject: "PE", level: "Level 2", type: "Know", text: "I know the importance of warm-ups and cool-downs to prevent injury and understand the basic function of the heart during exercise." },
                            { subject: "PE", level: "Level 4", type: "Do", text: "I can create a personalised, balanced fitness plan that targets cardiovascular endurance, muscular strength, and flexibility, and track my progress." }
                        ]
                    }
                ]
            }
        ]
    },
    {
        area: "Sciences",
        color: "bg-teal-600",
        bigIdeas: [
            {
                idea: "Scientific Inquiry and Investigation",
                concepts: [
                    {
                        name: "Experimental Design",
                        description: "Formulating questions, designing fair tests, and collecting data.",
                        statements: [
                            { subject: "Physics", level: "Level 1", type: "Know", text: "I know that experiments help us find answers to questions and can identify things that push or pull." },
                            { subject: "Chemistry", level: "Level 2", type: "Do", text: "I can formulate a simple hypothesis (prediction) before conducting an investigation into material changes." },
                            { subject: "Biology", level: "Level 3", type: "Do", text: "I can identify, control, and measure variables accurately in a fair test relating to plant growth." },
                            { subject: "Chemistry", level: "Level 4", type: "Know", text: "I know the difference between qualitative and quantitative data and can select appropriate methods for collecting each." }
                        ]
                    },
                    {
                        name: "Earth and Space",
                        description: "Understanding global and celestial phenomena.",
                        statements: [
                            { subject: "Science", level: "Early Years", type: "Know", text: "I know the names of the seasons and simple weather changes (rain, sun, snow)." },
                            { subject: "Physics", level: "Level 2", type: "Do", text: "I can model the rotation of the Earth to explain day and night using a light source." },
                            { subject: "Biology", level: "Level 3", type: "Know", text: "I know the structure and function of the major body systems (e.g., digestive, circulatory)." },
                            { subject: "Physics", level: "Level 4", type: "Know", text: "I know that celestial bodies (planets, moons) are governed by gravitational forces and that the universe is vast and expanding." }
                        ]
                    }
                ]
            }
        ]
    }
];

// --- Firebase and Data Handling ---

const App = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [canvasItems, setCanvasItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [selectedArea, setSelectedArea] = useState('All');

    // State for drag and drop
    const [isDragging, setIsDragging] = useState(false);
    const [draggedItemId, setDraggedItemId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    // 1. Firebase Initialization and Authentication
    useEffect(() => {
        if (firebaseConfig) {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const authentication = getAuth(app);

                setDb(firestore);
                setAuth(authentication);

                const unsubscribe = onAuthStateChanged(authentication, async (user) => {
                    if (user) {
                        setUserId(user.uid);
                    } else if (initialAuthToken) {
                        await signInWithCustomToken(authentication, initialAuthToken);
                    } else {
                        const anonymousUser = await signInAnonymously(authentication);
                        setUserId(anonymousUser.user.uid);
                    }
                    setIsAuthReady(true);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Firebase initialization failed:", error);
            }
        }
    }, [firebaseConfig, initialAuthToken]);

    const getCollectionRef = useCallback(() => {
        if (db && userId) {
            // Using a public collection path for shared planning documents
            return collection(db, `artifacts/${appId}/public/data/planningItems`);
        }
        return null;
    }, [db, userId, appId]);

    // 2. Firestore Realtime Data Fetching (onSnapshot)
    useEffect(() => {
        const itemsRef = getCollectionRef();
        if (isAuthReady && itemsRef) {
            const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
                const fetchedItems = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCanvasItems(fetchedItems);
            }, (error) => {
                console.error("Error fetching planning items:", error);
            });
            return () => unsubscribe();
        }
    }, [isAuthReady, getCollectionRef]);

    // Pre-process curriculum data to easily map concept names to their details (color, description)
    const conceptDetailsMap = useMemo(() => {
        const map = {};
        CURRICULUM_DATA.forEach(areaData => {
            areaData.bigIdeas.forEach(idea => {
                idea.concepts.forEach(concept => {
                    map[concept.name] = {
                        description: concept.description,
                        areaColor: areaData.color,
                        area: areaData.area,
                    };
                });
            });
        });
        return map;
    }, []);

    // Calculate unique covered concepts for the dashboard
    const coveredConcepts = useMemo(() => {
        const conceptCounts = {};
        const conceptsData = {}; 

        canvasItems.forEach(item => {
            if (item.type === 'Statement' && item.concept) {
                conceptCounts[item.concept] = (conceptCounts[item.concept] || 0) + 1;
                
                // Look up details from the pre-processed map
                if (!conceptsData[item.concept] && conceptDetailsMap[item.concept]) {
                    conceptsData[item.concept] = {
                        ...conceptDetailsMap[item.concept],
                    };
                }
            }
        });

        // Final structure combining counts and details
        return Object.keys(conceptCounts).map(name => ({
            name,
            count: conceptCounts[name],
            description: conceptsData[name]?.description || 'N/A',
            areaColor: conceptsData[name]?.areaColor || 'bg-gray-400',
            area: conceptsData[name]?.area || 'N/A',
        })).sort((a, b) => a.area.localeCompare(b.area) || a.name.localeCompare(b.name));

    }, [canvasItems, conceptDetailsMap]);


    // 3. Firestore CRUD Operations

    const updateItemPosition = useCallback(async (id, newX, newY) => {
        if (!db || !userId) return;
        const itemsRef = getCollectionRef();
        try {
            await updateDoc(doc(itemsRef, id), { x: newX, y: newY });
        } catch (error) {
            console.error("Error updating item position:", error);
        }
    }, [db, userId, getCollectionRef]);

    const deleteItem = useCallback(async (id) => {
        if (!db || !userId) return;
        const itemsRef = getCollectionRef();
        try {
            await deleteDoc(doc(itemsRef, id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }, [db, userId, getCollectionRef]);

    const addNote = useCallback(async () => {
        if (!db || !userId) return;
        const itemsRef = getCollectionRef();
        try {
            await addDoc(itemsRef, {
                type: 'Note',
                text: 'New Teacher Note',
                x: 50, // Default starting position on canvas
                y: 50,
                color: 'bg-yellow-400',
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error adding note:", error);
        }
    }, [db, userId, getCollectionRef]);

    // 4. Drag Handling for Canvas Items (Moveable)
    const handleDragStart = (e, id, currentX, currentY) => {
        if (e.button !== 0) return; // Only allow left click
        setIsDragging(true);
        setDraggedItemId(id);
        
        // Calculate the offset from the mouse pointer to the item's origin
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left + currentX,
            y: e.clientY - rect.top + currentY
        });
        e.currentTarget.style.zIndex = 1000; // Bring to front
    };

    const handleDrag = useCallback((e) => {
        if (!isDragging || !draggedItemId) return;
        
        // Ensure event coordinates are available (for both mouse and touch)
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        if (typeof clientX === 'undefined' || typeof clientY === 'undefined') return;

        const canvasRect = document.getElementById('planning-canvas').getBoundingClientRect();

        let newX = clientX - canvasRect.left - (dragOffset.x - canvasItems.find(item => item.id === draggedItemId)?.x);
        let newY = clientY - canvasRect.top - (dragOffset.y - canvasItems.find(item => item.id === draggedItemId)?.y);

        // Simple boundary check (optional but good practice)
        newX = Math.max(0, newX);
        newY = Math.max(0, newY);
        
        // Optimistically update local state for smooth dragging
        setCanvasItems(prevItems => prevItems.map(item => 
            item.id === draggedItemId ? { ...item, x: newX, y: newY } : item
        ));
    }, [isDragging, draggedItemId, dragOffset, canvasItems]);


    const handleDragEnd = useCallback(() => {
        if (draggedItemId) {
            const finalItem = canvasItems.find(item => item.id === draggedItemId);
            if (finalItem) {
                updateItemPosition(finalItem.id, finalItem.x, finalItem.y);
            }
        }
        setIsDragging(false);
        setDraggedItemId(null);
    }, [draggedItemId, canvasItems, updateItemPosition]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDrag);
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDrag);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDrag, handleDragEnd]);


    // 5. Drag Handling for Curriculum Statements (From Drawer to Canvas)

    const handleStatementDragStart = (e, statement, concept, areaColor) => {
        // Store the data needed to create the canvas item
        const dragData = {
            type: 'Statement',
            text: statement.text,
            color: areaColor,
            level: statement.level,
            knowDo: statement.type,
            subject: statement.subject,
            concept: concept.name,
            conceptDescription: concept.description,
            // A unique, temporary ID for the drag event
            dragId: Date.now().toString(), 
        };
        e.dataTransfer.setData("application/json", JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = "copy";
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        if (!db || !userId) return;

        const canvasRect = e.currentTarget.getBoundingClientRect();
        const dropX = e.clientX - canvasRect.left;
        const dropY = e.clientY - canvasRect.top;

        try {
            const data = e.dataTransfer.getData("application/json");
            const dragData = JSON.parse(data);

            if (dragData.type === 'Statement') {
                const itemsRef = getCollectionRef();
                await addDoc(itemsRef, {
                    type: 'Statement',
                    text: dragData.text,
                    x: dropX - 100, // Offset to center the dropped item
                    y: dropY - 20,
                    color: dragData.color,
                    level: dragData.level,
                    knowDo: dragData.knowDo,
                    subject: dragData.subject,
                    concept: dragData.concept,
                    conceptDescription: dragData.conceptDescription,
                    createdAt: serverTimestamp(),
                });
            }
        } catch (error) {
            console.error("Error processing drop:", error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = "copy";
    };

    // --- Components for Rendering ---

    const ConceptDashboard = ({ concepts }) => {
        if (concepts.length === 0) {
            return (
                <div className="p-4 bg-white border-b text-gray-500 italic">
                    Drag some statements onto the canvas to see which concepts you are covering.
                </div>
            );
        }

        return (
            <div className="p-4 border-b bg-gray-50 overflow-x-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Covered Concepts ({concepts.length})</h3>
                <div className="flex space-x-3 pb-2">
                    {concepts.map((concept) => (
                        <div 
                            key={concept.name}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl shadow-md flex-shrink-0 w-48 transition-all duration-300 transform hover:scale-[1.02] ${concept.areaColor.replace('600', '100')}`}
                        >
                            <span className={`text-3xl font-extrabold ${concept.areaColor.replace('bg', 'text')}`}>{concept.count}</span>
                            <p className="text-xs font-semibold uppercase mt-1 text-gray-700">{concept.area}</p>
                            <p className="text-sm font-bold text-center text-gray-800 leading-tight mt-0.5">{concept.name}</p>
                            <p className="text-xs italic text-center text-gray-500 mt-1 truncate w-full">{concept.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const CanvasItem = ({ item, handleDragStart, deleteItem }) => {
        // Removed ConceptDetails logic from here
        const itemClass = item.type === 'Statement' ? 
            `${item.color} text-white p-3 rounded-lg shadow-lg cursor-move transition-shadow duration-150 active:shadow-xl` : 
            `${item.color} text-gray-800 p-3 rounded-lg shadow-lg border border-gray-300 cursor-move transition-shadow duration-150 active:shadow-xl`;

        const isMoving = draggedItemId === item.id;

        return (
            <div
                id={`item-${item.id}`}
                className={itemClass}
                style={{
                    position: 'absolute',
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    width: '240px',
                    minHeight: '80px',
                    zIndex: isMoving ? 1000 : 10,
                }}
                onMouseDown={(e) => handleDragStart(e, item.id, item.x, item.y)}
                onTouchStart={(e) => handleDragStart(e, item.id, item.x, item.y)}
            >
                <div className="flex justify-between items-start">
                    <p className="text-xs font-bold uppercase mb-1">
                        {item.type === 'Statement' ? 
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-medium mr-1">
                                {item.knowDo} | {item.level}
                            </span>
                            : <span>Teacher Note</span>
                        }
                    </p>
                    <button 
                        onClick={() => deleteItem(item.id)} 
                        className="text-white/70 hover:text-white transition-colors duration-150 p-1 -mt-2 -mr-2 rounded-full hover:bg-black/10"
                        title="Delete Item"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <p className={`text-sm font-medium ${item.type === 'Note' ? 'text-gray-800' : 'text-white'}`}>
                    {item.text}
                </p>
                
                {/* Textarea for editable notes */}
                {item.type === 'Note' && (
                    <textarea
                        className="w-full text-sm mt-2 bg-yellow-200 p-1 rounded resize-none focus:ring-2 focus:ring-yellow-600 outline-none text-gray-800"
                        value={item.text}
                        rows="3"
                        onChange={(e) => setCanvasItems(prev => prev.map(i => i.id === item.id ? { ...i, text: e.target.value } : i))}
                        onBlur={(e) => {
                            // Persist note changes on blur
                            updateDoc(doc(getCollectionRef(), item.id), { text: e.target.value });
                        }}
                    />
                )}
                {/* Small indicator for statement type */}
                {item.type === 'Statement' && (
                     <div className="text-xs mt-1 pt-1 border-t border-white/30 font-medium opacity-80">
                         Concept: {item.concept}
                    </div>
                )}
            </div>
        );
    };

    // Curriculum Statement Draggable in Drawer (remains the same)
    const StatementItem = ({ statement, concept, areaColor }) => (
        <div
            draggable
            onDragStart={(e) => handleStatementDragStart(e, statement, concept, areaColor)}
            className={`p-2 my-1 rounded-md text-sm cursor-grab shadow-sm transition-all duration-200 
                ${statement.type === 'Know' ? 'bg-gray-100 hover:bg-gray-200 border-l-4 border-blue-400' : 'bg-gray-100 hover:bg-gray-200 border-l-4 border-teal-400'}`}
        >
            <span className={`text-xs font-bold mr-2 px-1 py-0.5 rounded-sm ${statement.type === 'Know' ? 'text-blue-600 bg-blue-100' : 'text-teal-600 bg-teal-100'}`}>
                {statement.type}
            </span>
            <span className="text-xs font-medium text-gray-700 mr-2">{statement.level}</span>
            <span className="text-xs italic text-gray-500">{statement.subject}</span>
            <p className="mt-1 text-sm text-gray-800">{statement.text}</p>
        </div>
    );

    // Curriculum Drawer Filtered Logic (remains the same)
    const filteredCurriculum = useMemo(() => {
        return CURRICULUM_DATA
            .filter(area => selectedArea === 'All' || area.area === selectedArea)
            .map(area => ({
                ...area,
                bigIdeas: area.bigIdeas.map(idea => ({
                    ...idea,
                    concepts: idea.concepts.map(concept => ({
                        ...concept,
                        statements: concept.statements.filter(statement => 
                            selectedLevel === 'All' || statement.level === selectedLevel
                        )
                    })).filter(concept => concept.statements.length > 0)
                })).filter(idea => idea.concepts.length > 0)
            })).filter(area => area.bigIdeas.length > 0);
    }, [selectedArea, selectedLevel]);

    const Drawer = () => (
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} bg-white border-r shadow-lg flex-shrink-0 h-full overflow-hidden`}>
            <div className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Curriculum Statements</h2>
                
                {/* Filters */}
                <div className="space-y-3 mb-4">
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value="All">Filter by Area (All)</option>
                        {CURRICULUM_DATA.map(area => (
                            <option key={area.area} value={area.area}>{area.area}</option>
                        ))}
                    </select>

                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option value="All">Filter by Level (All)</option>
                        {LEVELS.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                
                <hr className="mb-4" />

                {/* Hierarchical List */}
                <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2">
                    {filteredCurriculum.length === 0 && (
                        <p className="text-center text-gray-500 italic mt-10">No statements match the current filters.</p>
                    )}
                    {filteredCurriculum.map(area => (
                        <AreaHierarchy key={area.area} area={area} />
                    ))}
                </div>
            </div>
        </div>
    );

    const AreaHierarchy = ({ area }) => {
        const [isAreaOpen, setIsAreaOpen] = useState(false);
        const areaColorClass = area.color.replace('bg-', 'text-');

        return (
            <div className="mb-4 border-l-2 pl-2" style={{ borderColor: area.color.replace('600', '400') }}>
                <button 
                    onClick={() => setIsAreaOpen(!isAreaOpen)} 
                    className={`flex justify-between items-center w-full p-2 rounded-md ${area.color.replace('600', '100')} ${areaColorClass} font-semibold text-left transition-colors duration-150 hover:bg-gray-200`}
                >
                    {area.area}
                    <svg className={`w-4 h-4 transform transition-transform duration-200 ${isAreaOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                {isAreaOpen && area.bigIdeas.map(idea => (
                    <BigIdeaHierarchy key={idea.idea} idea={idea} areaColor={area.color} />
                ))}
            </div>
        );
    };

    const BigIdeaHierarchy = ({ idea, areaColor }) => {
        const [isIdeaOpen, setIsIdeaOpen] = useState(false);
        return (
            <div className="ml-3 my-2">
                <button 
                    onClick={() => setIsIdeaOpen(!isIdeaOpen)} 
                    className="flex items-center w-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150 py-1.5"
                >
                    <svg className={`w-3 h-3 mr-2 transform transition-transform duration-200 ${isIdeaOpen ? 'rotate-90' : 'rotate-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    {idea.idea}
                </button>
                {isIdeaOpen && idea.concepts.map(concept => (
                    <ConceptHierarchy key={concept.name} concept={concept} areaColor={areaColor} />
                ))}
            </div>
        );
    };

    const ConceptHierarchy = ({ concept, areaColor }) => {
        const [isConceptOpen, setIsConceptOpen] = useState(false);
        return (
            <div className="ml-6 border-l pl-3 my-2">
                <button 
                    onClick={() => setIsConceptOpen(!isConceptOpen)} 
                    className="flex items-center w-full text-sm italic text-gray-500 hover:text-gray-700 py-1"
                >
                    <svg className={`w-2.5 h-2.5 mr-2 transform transition-transform duration-200 ${isConceptOpen ? 'rotate-90' : 'rotate-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                    {concept.name}
                </button>
                {isConceptOpen && (
                    <div className="mt-2 space-y-2">
                        {concept.statements.map((statement, index) => (
                            <StatementItem key={index} statement={statement} concept={concept} areaColor={areaColor} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex h-screen w-full bg-gray-50 font-inter">
            {/* Sidebar/Drawer */}
            <Drawer />
            
            {/* Main Planning Area */}
            <div className="flex-grow flex flex-col relative overflow-hidden">
                {/* Top Bar/Controls */}
                <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm flex-shrink-0">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-150"
                            title={isSidebarOpen ? "Hide Drawer" : "Show Drawer"}
                        >
                            <svg className={`w-6 h-6 transform transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                        </button>
                        <h1 className="text-2xl font-extrabold text-gray-900">Curriculum Planning Board</h1>
                    </div>
                    
                    <button 
                        onClick={addNote} 
                        className="flex items-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-150 active:scale-95"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Note
                    </button>
                </div>
                
                {/* Concept Dashboard (New Component) */}
                <ConceptDashboard concepts={coveredConcepts} />

                {/* Planning Canvas */}
                <div 
                    id="planning-canvas"
                    className="flex-grow relative overflow-auto bg-white"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    // Prevent context menu on touch devices when holding down
                    onTouchStart={(e) => { if (e.touches.length > 1) e.preventDefault(); }}
                >
                    {/* Grid background for visual aid */}
                    <div className="absolute inset-0 bg-repeat bg-[size:20px_20px] opacity-20" style={{ backgroundImage: "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0ff0f 1px, transparent 1px)" }}></div>

                    {isAuthReady && canvasItems.map(item => (
                        <CanvasItem 
                            key={item.id} 
                            item={item} 
                            handleDragStart={handleDragStart} 
                            deleteItem={deleteItem}
                        />
                    ))}

                    {!isAuthReady && (
                         <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
                            <p className="text-xl font-medium text-gray-600">Loading Planner Data...</p>
                        </div>
                    )}

                </div>
                 {/* Footer for status and user info */}
                <div className="p-2 border-t bg-gray-100 text-xs text-gray-500 flex justify-between flex-shrink-0">
                    <p>Planning items saved in real-time. Drag statements from the left onto the board.</p>
                    <p>User ID: <span className="font-mono text-gray-800">{userId || 'Connecting...'}</span></p>
                </div>
            </div>
        </div>
    );
};

export default App;
